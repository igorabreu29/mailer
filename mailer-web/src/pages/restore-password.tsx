import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useRestorePassword } from "@/hooks/useRestorePassword";
import { useNavigate, useSearchParams } from "react-router-dom";

const restorePasswordSchema = z.object({
  password: z.string().min(8, 'The password cannot be less than 8 characters').max(12, 'The password cannot be bigger than 12 characters.')
})

export type RestorePasswordInformData = z.infer<typeof restorePasswordSchema>

export function RestorePassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const { handleSubmit, register, formState: {errors} } = useForm<RestorePasswordInformData>({
    resolver: zodResolver(restorePasswordSchema)
  })

  const { mutateAsync: restorePasswordFn } = useRestorePassword()

  async function handleAuthenticate(data: RestorePasswordInformData) {
    const { password } = data

    try {
      await restorePasswordFn({ email, password })
      alert('Sua senha foi redefinida')
      navigate('/auth')
    } catch (error) {
      alert('Password is not valid.')
    }
  }

  return (
    <div className="notflex notjustify-center notflex-col notitems-center notgap-4">
      <h2 className="nottext-4xl notfont-bold">Restore Password</h2>
      <form className="notborder notspace-y-2 notpy-2 notpx-4 notrounded notw-96" onSubmit={handleSubmit(handleAuthenticate)}>
        <div className="notw-full">
          <label htmlFor="password">Password:</label>
          <Input type="password" id="password" {...register('password')} />
          {errors.password && <span className="nottext-red-500">{errors.password.message}</span>}
        </div>
        <Button type="submit" className="notw-full notfont-bold" variant={"secondary"}>Restore</Button>
      </form>
    </div>
  )
}