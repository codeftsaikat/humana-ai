import Container from '@/components/container'
import React from 'react'

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="text-lg mt-4">This is a simple Next.js starter template with Tailwind CSS and TypeScript</p>
      </div>
    </Container>
  )
}

export default Home