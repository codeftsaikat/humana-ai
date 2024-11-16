'use client'

import { Button } from "./ui/button"
import { login } from "@/actions/auth"

const LoginBtn = () => {
  return (
    <Button onClick={() => login("github")}>
      Login
    </Button>
  )
}

export default LoginBtn