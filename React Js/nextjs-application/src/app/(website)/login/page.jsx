"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function page() {

  // const isLogin = useSelector((state) => {
  //   return state.user_login.isLogin
  // })

  // const router = useRouter();

  // useEffect(() => {
  //   if(isLogin){
  //     router.push('/')
  //   }
  // },[isLogin]);

  return (
    <div className='text-center p-5'>
      Login page
    </div>
  )
}
