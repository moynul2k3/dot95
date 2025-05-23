'use client'

import React, { useEffect, useState } from 'react'
//import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function EntryAnimation() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (hasVisited) {
      setSkip(true)
      router.push('/biko')
      return
    }

    sessionStorage.setItem('hasVisited', 'true')

    const fadeInTimeout = setTimeout(() => {
      setShow(true)
    }, 100)

    const fadeOutTimeout = setTimeout(() => {
      setShow(false)
    }, 4000)

    const redirectTimeout = setTimeout(() => {
      router.push('/biko')
    }, 100)

    return () => {
      clearTimeout(fadeInTimeout)
      clearTimeout(fadeOutTimeout)
      clearTimeout(redirectTimeout)
    }
  }, [router])

  if (skip) return null

  return (
    <div
      className={`flex justify-center items-center h-screen w-screen bg-white text-white transition-all duration-100 
        ${show ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
    >
      <Image
        src="/logos/biko.png"
				alt="Biko"
				width={50}
				height={50}
        className=''
        priority
      />
    </div>
  )
}
