import { cn } from '@/lib/utils'
import React from 'react'

function MaxWidthWrapper({ className, children }) {
    return (
        <div className={cn(`w-full h-full max-w-screen px-2.5 md:px-20`, className)}>{children}</div>
    )
}

export default MaxWidthWrapper