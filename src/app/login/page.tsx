import { auth } from "@/auth"
import { redirect } from "next/navigation"

import Container from "@/components/container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import GithubAuthBtn from "./components/github-auth-btn"
import LoginForm from "./components/login-form"
import RegisterForm from "./components/register-form"

const LoginPage = async () => {

  const session = await auth()

  if (session) {
    redirect("/")
  }

  return (
    <Container className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md" >
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in or sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <GithubAuthBtn />
        </CardFooter>
      </Card>
    </Container>
  )
}

export default LoginPage