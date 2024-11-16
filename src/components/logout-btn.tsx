'use client'

import { Button } from "./ui/button"
import { logout } from "@/actions/auth"

const LogoutBtn = () => {

  return (
    <Button variant='outline' onClick={() => logout()}>
      Logout
    </Button>
  )
}

export default LogoutBtn