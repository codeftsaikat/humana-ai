import Container from '@/components/container'
import TextBox from '@/components/text-box'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {

  return (
    <main className='w-full pt-16 pb-8'>
      <Container className='flex-1 flex flex-col items-center text-center space-y-4 py-16'>
        <div className='mt-16 space-y-2'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>Humanize AI Generated Content</h1>
          <p className='mx-auto max-w-3xl text-muted-foreground md:text-xl dark:text-gray-400'>
            StealthWriter is an SEO tool that converts AI generated content into human-like content. Get better content & get 100% human score.
          </p>
        </div>
        <Button className='h-10 w-full max-w-48'>
          Get Started
        </Button>
      </Container>
      <Container className='max-w-5xl'>
        <TextBox />
      </Container>
    </main>
  )
}

export default Home