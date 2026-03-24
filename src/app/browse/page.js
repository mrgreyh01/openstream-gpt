"use client"
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from 'react'
import nowPlayingService from '@/services/nowPlaying.service'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setNowPlaying } from '@/store/slices/movieslice'

export default function Browse() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    async function fetchData() {
        const data = await nowPlayingService(user);

        if(data !== null){
          dispatch(setNowPlaying(data));
        }
    }
    if (!user) {
      return; 
    }

    fetchData();
  }, [user]);

  return (
    <>
      <Header />
      <div>You are inside Browse Page</div>
    </>
  )
}
