"use client"
import React from 'react'
import Header from '../components/Header'
import { Provider } from 'react-redux'
import appStore from '@/utils/redux/appstore'


export default function Browse() {
  return (
    <>
      <Provider store={appStore}>
        <Header />
      </Provider>
      <div>You are inside Browse Page</div>
    </>
  )
}
