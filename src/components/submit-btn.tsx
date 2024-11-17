'use client'

import { FC } from 'react'
import { Button } from './ui/button'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  name: string;
  isLoading: boolean;
}

const SubmitBtn: FC<Props> = ({ name, isLoading }) => {
  return (
    <Button disabled={isLoading} type='submit' className={cn("w-full", isLoading ? "opacity-50" : "")}>
      {isLoading ? <LoaderCircle className='animate-spin' /> : name}
    </Button >
  )
}

export default SubmitBtn