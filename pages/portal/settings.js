import Button from '@/components/atoms/Button'
import PortalLayout from '@/components/common/PortalLayout'
import { updatePassword, updateUser } from '@/functions/membersuite/auth'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'

export default function Page() {
  const { data: session } = useSession()
  const level = session?.membership?.level

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [updateInfoSuccess, setUpdateInfoSuccess] = useState(false)
  const [updateInfoError, setUpdateInfoError] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false)
  const [updatePasswordError, setUpdatePasswordError] = useState(false)

  useEffect(() => {
    if (session) {
      setEmail(session.email)
      setFirstName(session.firstName)
      setLastName(session.lastName)
    }
  }, [session])

  async function handleUpdateUser(e) {
    e.preventDefault()

    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
    }

    const res = await updateUser(session.accessToken, session.userId, userData)

    if (res !== null) {
      setUpdateInfoSuccess(true)
      setUpdateInfoError(false)
    } else {
      setUpdateInfoSuccess(false)
      setUpdateInfoError(true)
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()

    const passwordData = {
      userId: session.userId,
      oldPassword: currentPassword,
      newPassword: newPassword1,
    }

    const res = await updatePassword(session.accessToken, passwordData)

    if (res !== null) {
      setUpdatePasswordSuccess(true)
      setUpdatePasswordError(false)
    } else {
      setUpdatePasswordSuccess(false)
      setUpdatePasswordError(true)
    }
  }

  return (
    <PortalLayout>
      <h1 className='text-4xl font-bold text-purple-dark mb-8 text-center'>
        Settings
      </h1>

      <div className='shadow rounded p-6 mb-8 bg-white'>
        <h3 className='text-2xl font-semibold mb-4'>Account</h3>

        <form onSubmit={handleUpdateUser} className='grid md:grid-cols-2 gap-4'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            className='rounded py-3 px-5'
          />

          <div className='hidden md:block'></div>

          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            className='rounded py-3 px-5'
          />

          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            className='rounded py-3 px-5'
          />

          <input
            type='submit'
            value='Update my Information'
            className='text-purple-dark hover:text-white bg-purple-light hover:bg-purple-dark text-lg py-2 px-6 rounded-full cursor-pointer'
          />
        </form>

        {updateInfoSuccess && (
          <p className='text-blue text-lg my-2'>
            Your information has been updated successfully
          </p>
        )}

        {updateInfoError && (
          <p className='text-red text-lg my-2'>
            Something went wrong... Please try again later.
          </p>
        )}
      </div>

      <div className='shadow rounded p-6 mb-8 bg-white'>
        <h3 className='text-2xl font-semibold mb-4'>Password</h3>

        <form
          onSubmit={handleUpdatePassword}
          className='grid md:grid-cols-2 gap-4'
        >
          <input
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder='Your Current Password'
            className='rounded py-3 px-5'
          />

          <div className='hidden md:block'></div>

          <input
            type='password'
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            placeholder='New Password'
            className='rounded py-3 px-5'
          />

          <input
            type='password'
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            placeholder='Confirm New Password'
            className='rounded py-3 px-5'
          />

          <input
            type='submit'
            value='Update my Password'
            className='text-purple-dark hover:text-white bg-purple-light hover:bg-purple-dark text-lg py-2 px-6 rounded-full cursor-pointer'
          />
        </form>

        {updatePasswordSuccess && (
          <p className='text-blue text-lg my-2'>
            Your password has been updated successfully
          </p>
        )}

        {updatePasswordError && (
          <p className='text-red text-lg my-2'>
            Something went wrong... Please try again later.
          </p>
        )}
      </div>

      <div className='shadow rounded p-6 mb-8 bg-white'>
        <h3 className='text-2xl font-semibold mb-4'>Subscription</h3>

        <p>
          Subscription Type:{' '}
          <span className='text-purple-dark font-semibold capitalize'>
            DHA {level?.replace('-', ' ').replace('-', ' ')}
          </span>
        </p>

        {/* <p>
          Subscription Product:{' '}
          <span className='text-purple-dark font-semibold'>
            {session?.membership?.product}
          </span>
        </p> */}

        <p>
          Subscriber Since:{' '}
          <span className='text-purple-dark font-semibold'>
            {dateFormat(
              session?.membership?.memberSince || '4/11/2022',
              'mmmm dS, yyyy'
            )}
          </span>
        </p>

        <p>
          Expires At:{' '}
          <span className='text-purple-dark font-semibold'>
            {dateFormat(
              session?.membership?.expireAt || '10/31/2022',
              'mmmm dS, yyyy'
            )}
          </span>
        </p>

        {/* <p>
          Due Amount:{' '}
          <span className='text-purple-dark font-semibold'>
            ${session?.membership?.dueAmount}
          </span>
        </p> */}

        {/* <p>
          Renews At:{' '}
          <span className='text-purple-dark font-semibold'>
            {session?.membership?.renewAt &&
              dateFormat(session?.membership?.renewAt, 'mmmm dS, yyyy')}
          </span>
        </p> */}

        {!level?.includes('plus') && (
          <Button
            type='primary'
            text='Upgrade My Subscription'
            className='my-4'
            href={
              level === 'provider'
                ? '/portal/membership/provider-upgrade'
                : '/portal/membership/market-research-upgrade'
            }
          />
        )}
      </div>

      <div className='p-6'>
        <Button
          type='custom'
          text='Sign Out'
          onClick={signOut}
          className='bg-red hover:bg-red-dark text-white'
        />
      </div>
    </PortalLayout>
  )
}
