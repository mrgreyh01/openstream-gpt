"use client"

import { removeUser } from '@/utils/redux/slices/userslice';
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';
import { signOut } from "firebase/auth";

export default function Header() {

  const router = useRouter();
  const user = useSelector((store) => store.users.user);
  console.log(user);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
    dispatch(removeUser());
    router.push("/");
  }).catch((error) => {
    console.error("Sign out error", error);
  });
};

  const handleClick = () => {
    
  }

  return (
    <div className='flex justify-between p-6 bg-gradient-to-b from-black to-transparent'>
        <div className='flex items-center justify-between'>
            <img className="w-22 md:w-36" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" />
            {/* <div className='absolute left-0 top-20 md:top-23 bg-gray-100 opacity-25 w-full h-[0.1px]'></div> */}
        </div>
        {user && (
          <div className='flex items-center justify-between gap-4'>
              <p className='font-bold text-orange-400 text-xl'>{user.displayName}</p>  
              <img 
                  className='w-12 rounded-lg'
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                  alt="User Avatar" 
              />
              <button onClick={() => handleSignOut()} className='cursor-pointer bg-red-700 border border-gray-500 font-bold text-white px-4 py-2 rounded-lg'>Sign Out</button>
          </div>
        )}
    </div>
  )
}