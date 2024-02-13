import { profile } from '@/api/profile'
import { useQuery } from '@tanstack/react-query'

export function useProfile(token: string) {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => profile({ token }),
    staleTime: Infinity,
  })

  return {
    ...query,
    user: query.data?.user
  }
}