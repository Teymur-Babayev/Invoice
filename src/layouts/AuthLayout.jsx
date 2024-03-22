import React from 'react'
import { Toaster } from "@/components/ui/toaster"


export const AuthLayout = ({children}) => {
  return (
    <div className='w-full bg-slate-200'>
      {children}
      <Toaster />
      </div>
  )
}
