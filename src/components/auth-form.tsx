'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { signInWithResend } from "@/actions/auth"
import AuthBtn from "./auth-btn"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { FaGithub } from 'react-icons/fa'

const formSchema = z.object({
  email: z.string().min(2).max(50),
})

const AuthForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de inicio de sesión
    console.log('Login:', { email, password })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de registro
    console.log('Register:', { name, email, password })
  }

  const handleGitHubAuth = () => {
    // Aquí iría la lógica de autenticación con GitHub
    console.log('GitHub Auth')
  }

  const handleMagicLink = () => {
    // Aquí iría la lógica de envío de Magic Link
    console.log('Magic Link sent to:', email)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Bienvenido</CardTitle>
        <CardDescription>Inicia sesión o regístrate para continuar</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="tu@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Iniciar Sesión</Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="tu@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Registrarse</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full" onClick={handleGitHubAuth}>
          <FaGithub className="mr-2 h-4 w-4" />
          Continuar con GitHub
        </Button>
        <Button variant="outline" className="w-full" onClick={handleMagicLink}>
          Enviar Magic Link
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AuthForm