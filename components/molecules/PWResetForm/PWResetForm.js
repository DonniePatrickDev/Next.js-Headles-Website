import { useState } from 'react'
import cn from 'classnames'
import styles from './PWResetForm.module.scss'
import Link from 'next/link'
import { confirmPassword } from '@/functions/membersuite/auth'

export default function PWResetForm({ email }) {
  const [username, setUsername] = useState(email)
  const [newPassword, setNewPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleReset = async (e) => {
    e && e.preventDefault()

    const forgotRes = await confirmPassword(username, code, newPassword)

    if (!forgotRes) {
      setError(
        'Internal Server Error. Please try again or contact customer support.'
      )
    } else {
      setSuccess('Your Password has been updated successfully!')
    }
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Get New Password</h3>

      <form
        className='mt-4 mb-4 flex flex-col items-start gap-4 rounded'
        onSubmit={handleReset}
      >
        {!success && (
          <>
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

            <input
              className={cn(styles.input)}
              id='password'
              name='password'
              type='password'
              placeholder='Your New Password'
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              className={cn(styles.input)}
              id='code'
              name='code'
              type='text'
              placeholder='Verification Code'
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <input
              className='bg-purple text-white hover:bg-purple-dark text-base font-semibold py-4 px-12 rounded-full cursor-pointer'
              type='submit'
              value='Get New Password'
            />
          </>
        )}

        {error && <p className='text-red'>{error}</p>}

        {success && <p className='text-blue'>{success}</p>}

        <div className='px-2'>
          <Link href='/portal'>
            <a className='text-purple'>Back to Login</a>
          </Link>
        </div>
      </form>
    </div>
  )
}
