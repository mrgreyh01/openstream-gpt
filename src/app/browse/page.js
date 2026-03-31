"use client"
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from 'react'
import nowPlayingService from '@/services/nowPlaying.service'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setNowPlaying, setTrailerVideo } from '@/store/slices/movieslice';
import MainContainer from '@/components/MainContainer';
import SecondaryContainer from '@/components/SecondaryContainer';
import movieTrailerService from '@/services/movieTrailer.service'

export default function Browse() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    async function fetchData() {
        const data = await nowPlayingService(user);

        if(data !== null){
          dispatch(setNowPlaying(data));
        
          const trailerData = await movieTrailerService(data[0].id );
          console.log("This is inside the UseEffect of Browse: ", trailerData);
        
          if(trailerData !== null){
            dispatch(setTrailerVideo(trailerData));
          }
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
      <MainContainer />
      <SecondaryContainer />
    </>
  )
}
