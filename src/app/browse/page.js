"use client"
import React from 'react'
import Header from '../../components/Header'
import { useState, useEffect } from 'react'
import nowPlayingService from '@/services/nowPlaying.service'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setNowPlaying } from '@/store/slices/movieslice'


export default function Browse() {

  // const [nowplaying, setNowPlaying] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    async function fetchData() {
        const data = await nowPlayingService(user);
        console.log("This is inside the UseEffect:",data);
        
        if(data !== null){
          dispatch(setNowPlaying(data));
        }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>You are inside Browse Page</div>
    </>
  )
}
