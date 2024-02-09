import { register } from '@/api/register'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
  const mutate = useMutation({
    mutationFn: register
  })

  return mutate
}