import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegister } from "@/hooks/useRegister";

import { useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  name: z.string().min(1, 'The name cannot be empty!'),
  email: z.string().email('Invalid form.'),
  password: z.string().min(8, 'The password cannot be less than 8 characters').max(12, 'The password cannot be bigger than 12 characters.')
})

export type RegisterInformData = z.infer<typeof registerSchema>

export function Register() {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm<RegisterInformData>({
    resolver: zodResolver(registerSchema)
  })

  const { mutateAsync: registerFn } = useRegister()

  async function handleRegister(data: RegisterInformData) {
    const { email, name, password } = data

    try {
      await registerFn({ email, name, password })
      navigate('/auth')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="notflex notjustify-center notflex-col notitems-center notgap-4">
      <h2 className="nottext-4xl notfont-bold">Register</h2>
      <form className="notborder notspace-y-2 notpy-2 notpx-4 notrounded notw-96" onSubmit={handleSubmit(handleRegister)}>
        <div className="notw-full">
          <label htmlFor="name">Name:</label>
          <Input type="text" id="name" {...register('name')} />
          {errors.name && <span className="nottext-red-500">{errors.name.message}</span>}
        </div>

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
        <Button type="submit" className="notw-full notfont-bold" variant={"secondary"}>Register</Button>
      </form>
    </div>
  )
}