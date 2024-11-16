'use client'

import AuthBtn from "./auth-btn"
import { signInWithResend } from "@/actions/auth"

const AuthForm = () => {

  return (
    <form action={signInWithResend}
    >
      <input type="text" name="email" placeholder="Email" />
      <AuthBtn />
    </form>
  )
}

export default AuthForm