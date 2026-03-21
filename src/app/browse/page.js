"use client"
import React from 'react'
import Header from '../../components/Header'
import { Provider } from 'react-redux'
import appStore from '@/store/appstore'
import { useState, useEffect } from 'react'
import nowPlayingService from '@/services/nowPlaying.service'

export default function Browse() {

  const [nowplaying, setNowPlaying] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const data = await nowPlayingService();
        console.log("This is inside the UseEffect:",data);
        setNowPlaying(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Provider store={appStore}>
        <Header />
      </Provider>
      <div>You are inside Browse Page</div>
    </>
  )
}
