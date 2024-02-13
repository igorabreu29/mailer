import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from 'sonner'

import Cookie from 'js-cookie'

const authenticateSchema = z.object({
  email: z.string().email('Invalid form.'),
  password: z.string().min(8, 'The password cannot be less than 8 characters').max(12, 'The password cannot be bigger than 12 characters.')
})

export type AuthenticateInformData = z.infer<typeof authenticateSchema>

export function Auth() {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: {errors} } = useForm<AuthenticateInformData>({
    resolver: zodResolver(authenticateSchema)
  })

  const { mutateAsync: authenticateFn } = useAuthenticate()

  async function handleAuthenticate(data: AuthenticateInformData) {
    const { email, password } = data

    try {
      const data = await authenticateFn({ email, password })
      const { token } = data

      Cookie.set('auth', token)

      toast.success('User authenticated', {
        action: {
          label: 'Navigate',
          onClick: () => {
            navigate('/protected')
          }
        },
      })
    } catch (error) {
      toast.error('Email or password invalid.', {
        duration: 2000,
        closeButton: true,
      })
    }
  }

  return (
    <div className="notflex notjustify-center notflex-col notitems-center notgap-4">
      <h2 className="nottext-4xl notfont-bold">Authenticate</h2>
      <div className="notflex notflex-col notgap-2 notitems-end">
        <form className="notborder notspace-y-2 notpy-2 notpx-4 notrounded notw-96" onSubmit={handleSubmit(handleAuthenticate)}>
          <div className="notw-full">
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" {...register('email')} />
            {errors.email && <span className="nottext-red-500">{errors.email.message}</span>}
          </div>
          
          <div className="notw-full">
            <label htmlFor="password">Password:</label>
            <Input type="password" id="password" {...register('password')} />
            {errors.password && <span className="nottext-red-500">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="notw-full notfont-bold" variant={"secondary"}>Auth</Button>
        </form>
        <button>
          <NavLink to={'/forgot'}>
            Forgot password?
          </NavLink>
        </button>
      </div>
    </div>
  )
}