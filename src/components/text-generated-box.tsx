'use client'

import React, { FC } from 'react'
import { Button } from './ui/button'
import { CopyIcon } from 'lucide-react'
import { copyClipboard } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface Props{
  humanizedText: string
  humanizedTextRef: React.RefObject<HTMLDivElement>
}

const TextGeneratedBox:FC<Props> = ({humanizedText, humanizedTextRef}) => {

  const handleCopy = (text: string) => {
    copyClipboard(text)
    toast({
      title: 'Copied to clipboard',
      description: 'The humanized text has been copied to your clipboard',
      color: 'success'
    })
  }


  return (
    <div ref={humanizedTextRef} className="mt-8 p-4 bg-gray-100 rounded-lg relative">
          <h2 className="text-xl font-bold mb-2">Humanized Text:</h2>
          <p className='text-sm'>{humanizedText}</p>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleCopy(humanizedText)}
            className="absolute top-2 right-2 rounded-full shadow-md"
          >
            <CopyIcon className='size-4' />
          </Button>
        </div>
  )
}

export default TextGeneratedBox