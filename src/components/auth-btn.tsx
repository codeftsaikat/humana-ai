import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { LoaderCircle, SendIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const AuthBtn = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} type='submit' className={cn("w-full max-w-60 flex items-center gap-2", pending ? "opacity-50" : "")}>
      {pending ? (
        <>
          <LoaderCircle className='animate-spin' />
          <span>Loading</span>
        </>
      ) : <>
        <SendIcon />
        <span>Magic Link</span>
      </>}
    </Button >
  )
}

export default AuthBtn