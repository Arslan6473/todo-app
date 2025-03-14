
'use client'

import { signIn } from "next-auth/react"
import Image from 'next/image'

export function LoginButton() {
  return (
    <div className='flex justify-center items-center'>
      <button 
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className='w-full'
      >
        <div className='shadow-md h-11 w-full px-6 rounded-md gap-2 border border-zinc-200 mt-4 flex justify-center items-center'>
          <Image src="/google.svg" alt='google' width={22} height={22}/>
          <div className='font-medium text-zinc-600 cursor-pointer'>Login with Google</div>
        </div>
      </button>
    </div>
  )
}