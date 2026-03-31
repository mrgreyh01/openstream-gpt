"use client"

import { removeUser } from '@/store/slices/userslice';
import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '@/lib/firebase';
import { useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import useUserAuthChanged from '@/hooks/useUserAuthChanged';
import { LOGO, USER_AVATAR } from '@/utils/constants';
import { removeNowPlaying } from '@/store/slices/movieslice';

export default function Header() {

  const user = useSelector((store) => store.users.user);
  const dispatch = useDispatch();

  //UseEffect called from this function
  useUserAuthChanged();

  const handleSignOut = () => {

    signOut(auth).then(() => {
    dispatch(removeUser());
    dispatch(removeNowPlaying()); 

  }).catch((error) => {

    console.error("Sign out error", error);

  });
};

  return (
    <div className='flex justify-between p-6 absolute z-50 w-full'>
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