import { auth } from '@/auth'
import Container from '@/components/container'
import React from 'react'

const Home = async () => {

  const session = await auth();

  return (
    <Container className='flex-1 pt-24'>
      <div>
        <h1>Home</h1>
        {session ? (
          <div>
            <p>{JSON.stringify(session)}</p>
          </div>
        ): (
          <div>
            null
          </div>
        )}
      </div>
    </Container>
  )
}

export default Home