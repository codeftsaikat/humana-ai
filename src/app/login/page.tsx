import { providerMaps, signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { type FC } from 'react'

interface Props {
  props: {
    searchParams: {
      callbackUrl: string | undefined
    }
  }
}

const LoginPage: FC<Props> = ({ props }) => {
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server"
          try {
            await signIn("credentials", formData)
          } catch (error) {
            // if (error instanceof AuthError) {
            //   return redirect(`http://localhost:3000/?error=${error.type}`)
            // }
            throw error
          }
        }}
      >
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      {Object.values(providerMaps).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })
            } catch (error) {
              // if (error instanceof AuthError) {
              //   return redirect(`http://localhost:3000/?error=${error.type}`)
              // }
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  )
}

export default LoginPage;