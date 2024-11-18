'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { CopyIcon, LoaderCircle, X } from 'lucide-react'
import { humanizeText } from '@/actions/openai'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/actions/user'
import { cn, copyClipboard } from '@/lib/utils'

const textSchema = z.object({
  text: z.string().min(32, 'Text must be at least 32 characters').max(1000, 'Text must be less than 1000 characters')
})

export default function TextBox() {
  const router = useRouter();
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const [humanizedText, setHumanizedText] = useState<string | null>(null)

  const humanizedTextRef = useRef<HTMLDivElement | null>(null);

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
    if (humanizedText && humanizedTextRef.current) {
      setTimeout(() => {
        humanizedTextRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [humanizedText]);

  const handleClear = () => {
    setValue('text', '')
  }

  const onSubmit = async ({ text }: z.infer<typeof textSchema>) => {
    setIsLoading(true)

    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
      toast({
        title: 'You need to be logged in to humanize text',
        description: 'Please login',
        variant: 'destructive'
      })
      router.push('/login')
    }

    try {
      const result = await humanizeText(text)
      setHumanizedText(result)
    } catch (error) {
      toast({
        title: 'Error',
        description: `${error}`,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    copyClipboard(text)
    toast({
      title: 'Copied to clipboard',
      description: 'The humanized text has been copied to your clipboard',
      color: 'success'
    })
  }

  return (
    <Card className="w-full shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className={cn("mt-2 text-sm text-muted-foreground", charCount > 1000 ? 'text-red-500' : '')}>
              Characters: {charCount} | Words: {wordCount}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {charCount > 0 && `${1000 - charCount} characters remaining`}
            </div>
            <Button disabled={isLoading} className='h-10 flex items-center gap-2' type="submit">
              {isLoading ? <><LoaderCircle className="animate-spin size-6" /><span>Humanizing...</span></> : 'Humanize'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {humanizedText && (
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
      )}
    </Card>
  )
}