import { auth } from "@/auth"
import { redirect } from "next/navigation"

import AuthForm from "@/components/auth-form"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

const LoginPage = async () => {

  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <Container className="mt-24">
      <div className="flex flex-col">
        <AuthForm />
        <Button variant='secondary'>
          <Github />
          <span>Login with Github</span>
        </Button>
      </div>
    </Container>
  )
}

export default LoginPage