"use client"

import { removeUser } from '@/store/slices/userslice';
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from "firebase/auth";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '@/store/slices/userslice';
import { LOGO, USER_AVATAR } from '@/utils/contants';

export default function Header() {

  const router = useRouter();
  const user = useSelector((store) => store.users.user);
  console.log(user);

  useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const {uid, email, displayName} = user.auth.currentUser;
                console.log("User is signed in:", user);
                dispatch(setUser({uid, email, displayName}));
                router.push("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                router.push("/");
            }
        });
        return () => unsubcribe();
    }, []);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
    dispatch(removeUser());
  }).catch((error) => {
    console.error("Sign out error", error);
  });
};

  const handleClick = () => {
    
  }

  return (
    <div className='flex justify-between p-6 bg-gradient-to-b from-black to-transparent'>
        <div className='flex items-center justify-between'>
            <img className="w-22 md:w-36" src= {LOGO} alt="logo" />
            {/* <div className='absolute left-0 top-20 md:top-23 bg-gray-100 opacity-25 w-full h-[0.1px]'></div> */}
        </div>
        {user && (
          <div className='flex items-center justify-between gap-4'>
              <p className='font-bold text-orange-400 text-xl'>{user.displayName}</p>  
              <img 
                  className='w-12 rounded-lg'
                  src={USER_AVATAR}
                  alt="User Avatar" 
              />
              <button onClick={() => handleSignOut()} className='cursor-pointer bg-red-700 border border-gray-500 font-bold text-white px-4 py-2 rounded-lg'>Sign Out</button>
          </div>
        )}
    </div>
  )
}