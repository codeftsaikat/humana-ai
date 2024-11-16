'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AuthBtn from '@/components/auth-btn'
import { registerWithCredentials } from '@/actions/auth'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const registerSchema = z.object({
  name: z.string().min(2, "Enter a valid name").max(32),
  email: z.string().email('Invalid email address').min(2).max(32),
  password: z.string().min(8, "Password must be at least 8 characters").max(32),
})

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async ({ name, email, password }: z.infer<typeof registerSchema>) => {
    setIsLoading(true)
    try {
      const result = await registerWithCredentials(name, email, password)
      if (result.success) {
        toast({
          title: "Registration Success",
          description: "You are now registered",
        })
        router.push("/")
      } else {
        toast({
          title: "Registration Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Register error:', error)
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred",
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
          name="name"
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <AuthBtn name='Register' isLoading={isLoading} />
      </form>
    </Form>
  )
}

export default RegisterForm