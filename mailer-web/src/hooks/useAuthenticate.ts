import { authenticate } from '@/api/authenticate'
import { useMutation } from '@tanstack/react-query'

export function useAuthenticate() {
  const mutate = useMutation({
    mutationFn: authenticate
  })

  return mutate
}