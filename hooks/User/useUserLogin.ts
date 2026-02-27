import { useRouter } from 'next/router'

import { APIError } from '@/api/types'
import { useAPI } from '@/contexts/API'

export const useUserLogin = () => {
  const api = useAPI()
  const router = useRouter()
  return api.useMutation('userLogin', {
    onSuccess: () => {
      localStorage.setItem('deerhacks-last-login', Date.now().toString())
      window.close()
      // Fallback: if window.close() is blocked (new tab instead of popup), redirect directly
      router.replace('/dashboard')
    },
    onError: (err) => {
      if ((err as APIError).apiError.status == 403) {
        router.replace('/login?context=unverified')
        return
      }
      router.replace('/login?context=')
    },
    onSettled: () => {
      api.queryClient.invalidateQueries({ queryKey: ['userGet'] })
    },
  })
}
