'use client'

import { useState, useEffect, useActionState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { X } from 'lucide-react'
import { humanizeText } from '@/actions/openai'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

const textSchema = z.object({
  text: z.string().min(32, 'Text must be at least 32 characters').max(1000, 'Text must be less than 1000 characters')
})

export default function TextBox() {
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const humanizedTextRef = useRef<HTMLDivElement | null>(null);

  const [state, action, isPending] = useActionState(humanizeText, null)

  const form = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: {
      text: ''
    }
  })

  const { watch, setValue } = form
  const text = watch('text')

  useEffect(() => {
    setCharCount(text.length)
    const words = text.trim().split(/\s+/)
    setWordCount(text.trim() === '' ? 0 : words.length)
  }, [text])

  useEffect(() => {
    if (state && humanizedTextRef.current) {
      humanizedTextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  const handleClear = () => {
    setValue('text', '')
  }

  console.log(state);

  return (
    <Card className="w-full shadow-lg">
      <Form {...form}>
        <form action={action}>
          <CardHeader className='pb-4'>
            <div className='space-x-2'>
              <Button className='text-xs h-8' variant='outline'>ChatGPT</Button>
              <Button disabled className='text-xs h-8' variant='outline'>Claude</Button>
              <Button disabled className='text-xs h-8' variant='outline'>Llama</Button>
            </div>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Enter your text here..."
                        className="min-h-[200px] pr-10"
                        {...field}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Characters: {charCount} | Words: {wordCount}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {charCount > 0 && `${1000 - charCount} characters remaining`}
            </div>
            <Button disabled={isPending} className='h-10' type="submit">
              {isPending ? 'Humanizing...' : 'Humanize'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {state && (
        <div ref={humanizedTextRef} className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Humanized Text:</h3>
          <p>{state}</p>
        </div>
      )}
    </Card>
  )
}