'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { X } from 'lucide-react'
import { humanizeText } from '@/actions/openai'

export default function TextBox() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    setCharCount(text.length)

    const words = text.trim().split(/\s+/)
    setWordCount(text.trim() === '' ? 0 : words.length)
  }, [text])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted text:', text)
    const res = await humanizeText(text);
    console.log('Humanized text:', res)
    setText('')
  }

  const handleClear = () => {
    setText('')
  }

  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader className='pb-4'>
          <div className='space-x-2'>
            <Button className='text-xs h-8' variant='outline'>ChatGPT</Button>
            <Button disabled className='text-xs h-8' variant='outline'>Claude</Button>
            <Button disabled className='text-xs h-8' variant='outline'>Llama</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClear}
            >
              <X className="size-4" />
              <span className="sr-only">Clear text</span>
            </Button>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Characters: {charCount} | Words: {wordCount}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {charCount > 0 && `${1000 - charCount} characters remaining`}
          </div>
          <Button className='h-10' type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  )
}