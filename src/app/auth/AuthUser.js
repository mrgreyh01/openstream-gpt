import { validateSignInForm, validateSignUpForm } from '@/utils/validator';
import { auth } from '@/utils/firebase';
import React, { useEffect, useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


export default function AuthUser() {

    const [newUser, setNewUser] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const emailOrPhone = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    useEffect(() => {
        setError(null);
        setSuccess(null);
    }, [newUser]);
    
    function handleForm () {

        setError(null);
        setSuccess(null);
        
        if (!newUser) {

            const error = validateSignInForm(emailOrPhone.current.value, password.current.value);
            if (error !== null) {
                setError(error);
                console.log(error);
                return;
            }

            //checking user and signing it in
            signInWithEmailAndPassword(auth, emailOrPhone.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setSuccess("User signed in successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode);
            });

        } else {

            const error = validateSignUpForm(emailOrPhone.current.value, password.current.value, name.current.value);
            if (error !== null) {
                setError(error);
                console.log(error);
                return;
            }

            //creating a user in firebase
            createUserWithEmailAndPassword(auth, emailOrPhone.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // Update the user's profile with the name (displayName)
                updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: "" // You can also add a photo URL here if needed
                })
                setSuccess("User created successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode);
            });
        }
    };

    return (
        <div className="h-screen w-full px-6 md:px-42 py-6 flex flex-col gap-8 bg-[url('https://occ.a.nflxso.net/dnm/api/v6/iMyKkw5SVrkCXbCfSBEb_Pjar5Y/AAAAQBTxE26zgLJoqZnmxUCfZtVJ2HbJUsVonZ_9Uo-pn68zarPK.png')] font-sans">
            <div className='flex items-center justify-between'>
                <img className="w-22 md:w-36" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" />
                <div className='absolute left-0 top-20 md:top-23 bg-gray-100 opacity-25 w-full h-[0.1px]'></div>
            </div>
            <div className='flex flex-col items-start justify-start md:items-center md:justify-center gap-2 mt-8 w-full'>
                <h1 className='font-bold text-3xl'>Enter your info to sign {newUser ? 'up' : 'in'} </h1>
                <h3 className='text-xl text-gray-400'>{newUser ? 'Or continue to watch your shows.' : 'Or get started with a new account.'}</h3>
                <form className='mt-4 flex flex-col w-full md:w-100 gap-5' onSubmit={(e) => {e.preventDefault(); handleForm()}}>
                    
                    {newUser && 
                    <input 
                    ref={name}
                    className='p-4 bg-black border border-gray-600 rounded-md' type="text" 
                    placeholder='Name' />}
                    
                    <input 
                    ref={emailOrPhone} 
                    className='p-4 bg-black border border-gray-600 rounded-md' 
                    type="text" 
                    placeholder='Email or phone number' 
                    />

                    {/* <div className="relative w-full max-w-100">
                        <img 
                            src="/icons/icon-closed-eye.png" 
                            alt="pswd closed eye icon" 
                            className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 object-contain opacity-70"
                        /> */}

                        <input 
                            ref={password}
                            className='p-4 bg-black border border-gray-600 rounded-md' 
                            type="password" 
                            placeholder='Password' 
                        />
                    {/* </div> */}

                    {error && <p className='text-red-600'>{error}</p>}  
                    {success && <p className='text-green-600'>{success}</p>}  

                    <button 
                    className='p-4 bg-red-700 rounded-md font-bold text-lg cursor-pointer' 
                    type='submit'
                    >
                        {newUser ? 'Sign Up' : 'Sign In'}
                    </button>

                      

                </form>

                <p 
                className='mt-3 text-base text-white justify-self-start' >
                    {newUser ? 'Already have an account? ' : 'New to the site? '} 
                    <a 
                    className='font-bold underline cursor-pointer text-white hover:text-red-600 ' 
                    onClick={() => setNewUser(!newUser)}
                    >
                        {newUser ? 'Sign In' : 'SignUp'}
                    </a>
                </p>
            </div>  

        </div>
    )
}

