'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from "@/hooks/use-toast"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitBtn from '@/components/submit-btn'
import { loginWithCredentials } from '@/actions/auth'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(2).max(32),
  password: z.string().min(1, "Invalid password").max(32),
})

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    try {
      await loginWithCredentials(email, password)
      toast({
        title: "Login Success",
        description: "You are now logged in",
      })
      router.push("/")
    } catch (error) {
      console.log('Login error:', error);
      toast({
        title: "Login Error",
        description: `${error}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn name='Login' isLoading={isLoading} />
      </form>
    </Form>
  )
}

export default LoginForm