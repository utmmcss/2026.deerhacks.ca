import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import FullPageSpinner from '@/components/Shared/FullPageSpinner'
import { useFeatureToggle } from '@/contexts/FeatureToggle'
import { useUserLogin } from '@/hooks/User/useUserLogin'
import Error404Page from '@/pages/404'

const Callback = () => {
  const { toggles } = useFeatureToggle()

  const searchParams = useSearchParams()
  const token = searchParams.get('code')
  const error = searchParams.has('error')
  const initialized = useRef(false)
  const router = useRouter()

  const { mutate: userLogin } = useUserLogin()

  useEffect(() => {
    // Workaround since React StrictMode runs twice in development
    if (initialized.current || !toggles.dashboard) return
    // Wait until URL params are available before locking initialized
    if (!token && !error) return
    initialized.current = true

    if (error) {
      router.replace('/login?context=auth')
      return
    }

    userLogin({ token })
  }, [userLogin, token, error, toggles.dashboard, router])

  return (
    <>
      <Head>
        <title>Redirecting | DeerHacks</title>
      </Head>
      {toggles.dashboard && token ? <FullPageSpinner /> : <Error404Page noTitle />}
    </>
  )
}

export default Callback
