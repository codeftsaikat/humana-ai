import { auth } from "@/auth"
import { redirect } from "next/navigation"

import AuthForm from "@/components/auth-form"
import Container from "@/components/container"

const LoginPage = async () => {

  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <Container className="flex-1 flex items-center justify-center">
      <AuthForm />
    </Container>
  )
}

export default LoginPage