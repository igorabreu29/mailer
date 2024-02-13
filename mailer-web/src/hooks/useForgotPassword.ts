import { forgotPassword } from '@/api/forgot-password'
import { useMutation } from '@tanstack/react-query'

export function useForgotPassword() {
  const mutate = useMutation({
    mutationFn: forgotPassword
  })

  return mutate
}