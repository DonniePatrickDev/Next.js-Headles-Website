import Tag from '@/components/atoms/Tag'
import cn from 'classnames'
import dateFormat from 'dateformat'
import Link from 'next/link'
// import styles from './PortalCard.module.scss'

export default function PortalCard({
  date,
  type,
  tags,
  view,
  download,
  background,
  bgType,
  className,
  children,
}) {
  return (
    <div
      className={cn('relative shadow bg-white px-4 py-6 rounded', className)}
      style={
        background && {
          background:
            bgType !== 'light'
              ? 'linear-gradient(146.96deg, #C270F3 -4.66%, #6218D7 69.84%)'
              : 'rgba(194, 112, 243, 0.14)',
          minHeight: '160px',
        }
      }
    >
      {background ? (
        <div className='h-full flex flex-col justify-center items-start'>
          {children && children}
        </div>
      ) : (
        <>
          <div>
            {date && (
              <div className='mb-4 text-sm font-semibold'>
                <span>{dateFormat(date, 'mmmm dS, yyyy')}</span>
              </div>
            )}

            {children && children}

            {Array.isArray(tags) &&
              tags
                .slice(0, 3)
                .map((tag, index) => (
                  <Tag
                    text={tag}
                    type='primary'
                    key={index}
                    style={{ fontSize: '10px', padding: '0 8px' }}
                    className='mr-1'
                  />
                ))}

            <div className='flex justify-end gap-6'>
              {view && (
                <Link href={view}>
                  <a className='text-lg text-purple mt-4'>View</a>
                </Link>
              )}

              {download && (
                <a
                  href={download}
                  target='_blank'
                  rel='noreferrer'
                  className='text-lg text-purple mt-4'
                >
                  View
                </a>
              )}
            </div>
          </div>

          {type && (
            <div className='absolute top-3 right-5'>
              <span className='text-purple-dark font-bold italic'>{type}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
