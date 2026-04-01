"use client"
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from 'react'
import nowPlayingService from '@/services/nowPlaying.service'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { setNowPlaying, setTrailer } from '@/store/slices/movieslice';
import MainContainer from '@/components/MainContainer';
import SecondaryContainer from '@/components/SecondaryContainer';
import movieTrailerService from '@/services/movieTrailer.service'

export default function Browse() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);
  const trailer = useSelector((store) => store.movies.trailer);

  useEffect(() => {
    async function fetchData() {
        const data = await nowPlayingService(user);

        if(data !== null){
          dispatch(setNowPlaying(data));

          if(trailer === null){
            const trailerData = await movieTrailerService();
            console.log("This is inside the UseEffect of Browse: ", trailerData);
          
            if(trailerData !== null){
              dispatch(setTrailer(trailerData));
            }
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
