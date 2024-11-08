import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import cn from 'classnames'
import styles from './SigninForm.module.scss'
import Link from 'next/link'

export default function SigninForm({ commercial }) {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e && e.preventDefault()

    signIn('un-pw-login', { username, password })
  }

  useEffect(() => {
    if (router.query.error === 'CredentialsSignin') {
      setError('Invalid username or password.')
    }
  }, [router.query.error])

  useEffect(() => {
    if (commercial === 'true') {
      setUsername(process.env.NEXT_PUBLIC_COMMERCIAL_LOGIN_UN)
      setPassword(process.env.NEXT_PUBLIC_COMMERCIAL_LOGIN_PW)
    }
  }, [commercial])

  useEffect(() => {
    if (commercial === 'true' && username && password) {
      handleLogin()
    }
  }, [username, password, commercial])

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Sign In</h3>

      <form
        className='mt-4 mb-4 flex flex-col items-start gap-4 rounded'
        onSubmit={handleLogin}
      >
        <input
          className={cn(styles.input, commercial && 'hidden')}
          id='username'
          name='username'
          type='email'
          placeholder='Your Email'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className={cn(styles.input, commercial && 'hidden')}
          id='password'
          name='password'
          type='password'
          placeholder='Your Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className='bg-purple text-white hover:bg-purple-dark text-base font-semibold py-4 px-12 rounded-full cursor-pointer'
          type='submit'
          value='Sign in to DHA'
        />

        {error && <p className='text-red'>{error}</p>}

        <div className='px-2'>
          <Link href='/portal/forgot-password'>
            <a className='text-purple'>Forgot Password?</a>
          </Link>
        </div>
      </form>
    </div>
  )
}
