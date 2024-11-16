'use client'

import { login } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const GithubAuthBtn = () => {

  const handleClick = async () => {
    await login('github')
  }

  return (
    <Button variant="secondary" className="w-full" onClick={handleClick}>
      <FaGithub className="mr-2 h-4 w-4" />
      Continue with GitHub
    </Button>
  )
}

export default GithubAuthBtn