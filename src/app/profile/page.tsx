'use client'

import { getUserTextTransformations } from '@/actions/user';
import Container from '@/components/container'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { copyClipboard } from '@/lib/utils';
import { CopyIcon, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <LoaderCircle className='size-8 animate-spin' />
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <p className="text-gray-600">No humanized texts were found.</p>
  </div>
);

const Profile = () => {
  const [textTransformations, setTextTransformations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleCopy = (text: string) => {
    copyClipboard(text)
    toast({
      title: 'Copied to clipboard',
      description: 'The humanized text has been copied to your clipboard',
      color: 'success'
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserTextTransformations();
        setTextTransformations(res);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: 'Error',
          description: 'Failed to load text transformations',
          color: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])

  return (
    <main className='w-full pt-24 pb-8'>
      <Container className='flex-1 flex flex-col items-center py-16'>
        <h1 className='text-3xl font-bold tracking-tighter mb-8'>Profile</h1>
        
        {isLoading ? (
          <Loader />
        ) : textTransformations.length === 0 ? (
          <EmptyState />
        ) : (
          textTransformations.map((text, index) => (
            <Card className='max-w-4xl mx-auto mt-4 w-full relative' key={index}>
              <CardContent className='pt-6'>
                <p className='text-sm'>{text}</p>
              </CardContent>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleCopy(text)}
                className="absolute top-2 right-2 rounded-full shadow-md"
              >
                <CopyIcon className='size-4' />
              </Button>
            </Card>
          ))
        )}
      </Container>
    </main>
  )
}

export default Profile