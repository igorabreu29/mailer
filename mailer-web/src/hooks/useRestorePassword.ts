import { restorePassword } from '@/api/restore-password'
import { useMutation } from '@tanstack/react-query'

export function useRestorePassword() {
  const mutate = useMutation({
    mutationFn: restorePassword
  })

  return mutate
}