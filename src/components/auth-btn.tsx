import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { LoaderCircle, SendIcon } from 'lucide-react'

const AuthBtn = () => {
  const { pending } = useFormStatus()
  return (
    <Button size='icon' disabled={pending} type='submit' className={pending ? 'opacity-50' : ''}>
      {pending ? <LoaderCircle className='animate-spin' /> : <SendIcon />}
    </Button >
  )
}

export default AuthBtn