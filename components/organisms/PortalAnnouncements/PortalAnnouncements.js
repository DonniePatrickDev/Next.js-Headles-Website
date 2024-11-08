import Button from '@/components/atoms/Button'
import { getAnnouncements } from '@/functions/wordpress/fetchData'
import { useState } from 'react'

export default function PortalAnnouncements({ level }) {
  const [show, setShow] = useState(true)

  const rndInt = Math.floor(Math.random() * 10) + 1
  const { data: announcements } = getAnnouncements(level)

  const announcement = announcements
    ? announcements[(announcements.length - 1) % rndInt]
    : null

  if (show && announcement) {
    return (
      <div className='relative px-8 pt-12 lg:pt-8 pb-6 bg-pink-100 rounded border border-dashed border-pink-200 mb-10'>
        <div className='text-center'>
          <h4 className='text-purple-dark text-xl font-bold mb-4'>
            {announcement.title}
          </h4>

          <p className='mb-2'>{announcement.text}</p>

          {announcement.button_text && announcement.button_link && (
            <Button
              type='custom'
              text={announcement.button_text}
              href={announcement.button_link}
              className='uppercase my-2 text-purple-dark bg-white hover:text-white hover:bg-purple-dark'
            />
          )}
        </div>

        <div className='absolute right-5 top-3'>
          <button onClick={() => setShow(false)} className='text-purple'>
            Close
          </button>
        </div>
      </div>
    )
  }

  return <></>
}
