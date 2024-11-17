'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { login } from '../actions'

const GithubAuthBtn = () => {

  const handleClick = async () => {
    await login('github')
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleClick}>
      <FaGithub className="mr-2 size-4" />
      Continue with GitHub
    </Button>
  )
}

export default GithubAuthBtn