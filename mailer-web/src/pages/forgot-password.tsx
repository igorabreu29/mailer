import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useNavigate } from 'react-router-dom'

import { useForgotPassword } from "@/hooks/useForgotPassword";

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid form.'),
})

export type ForgotPasswordInformData = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: {errors} } = useForm<ForgotPasswordInformData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const { mutateAsync: forgotPasswordFn } = useForgotPassword()

  async function handleAuthenticate(data: ForgotPasswordInformData) {
    const { email } = data

    try {
      await forgotPasswordFn({ email })
      navigate('/auth')
      // toast.dark('We sent an email for you.', {
      //   type: 'success',
      //   closeOnClick: true,
      //   autoClose: 2000
      // })
    } catch (error) {
    //   toast.dark('Email is not valid or not exist.', {
    //     type: 'error',
    //     closeOnClick: true,
    //     autoClose: 2000
    //   })
    }
  }

  return (
    <div className="notflex notjustify-center notflex-col notitems-center notgap-4">
      <h2 className="nottext-4xl notfont-bold">Forgot Password</h2>
      <form className="notborder notspace-y-2 notpy-2 notpx-4 notrounded notw-96" onSubmit={handleSubmit(handleAuthenticate)}>
        <div className="notw-full">
          <label htmlFor="email">Email:</label>
          <Input type="email" id="email" {...register('email')} />
          {errors.email && <span className="nottext-red-500">{errors.email.message}</span>}
        </div>
        <Button type="submit" className="notw-full notfont-bold" variant={"secondary"}>Send</Button>
      </form>
    </div>
  )
}