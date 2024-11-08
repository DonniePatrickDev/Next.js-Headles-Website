import { useState } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import styles from './PWForgotForm.module.scss'
import Link from 'next/link'
import { forgotPassword } from '@/functions/membersuite/auth'

export default function PWForgotForm() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleForgot = async (e) => {
    e && e.preventDefault()

    const forgotRes = await forgotPassword(username)

    if (!forgotRes) {
      setError(
        "We can't find your email address. Please contact customer support."
      )
    } else {
      router.push(`/portal/reset-password?username=${username}`)
    }
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Get New Password</h3>

      <form
        className='mt-4 mb-4 flex flex-col items-start gap-4 rounded'
        onSubmit={handleForgot}
      >
        <input
          className={cn(styles.input)}
          id='username'
          name='username'
          type='email'
          placeholder='Your Email'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>
          Please enter your email address. You will receive an email message
          with verification code.
        </p>

        <input
          className='bg-purple text-white hover:bg-purple-dark text-base font-semibold py-4 px-12 rounded-full cursor-pointer'
          type='submit'
          value='Get New Password'
        />

        {error && <p className='text-red'>{error}</p>}

        <div className='px-2'>
          <Link href='/portal'>
            <a className='text-purple'>Back to Login</a>
          </Link>
        </div>
      </form>
    </div>
  )
}
