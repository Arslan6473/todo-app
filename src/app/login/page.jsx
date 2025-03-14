import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { LoginButton } from './LoginButton' // We'll create this component

const LoginPage = async () => {
    const session = await getServerSession(authOptions) 
    const user = session?.user;

    if (user) {
        redirect("/")
    }

    return (
        <MaxWidthWrapper>
            <div className='w-full h-[75vh] flex justify-center items-center'>
                <div className='w-[440px] bg-zinc-50 shadow-md rounded-md flex flex-col justify-center p-6'>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex flex-col justify-center items-center'>
                            <Link href="/" className='text-md font-medium'>
                                Todo<span className='text-green-600'>App</span>
                            </Link>
                        </div>
                        <div className='text-xl font-bold text-zinc-600'>Login</div>
                        <div className='text-zinc-500 text-md'>Welcome back 👋!</div>
                    </div>
                    <LoginButton />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default LoginPage;