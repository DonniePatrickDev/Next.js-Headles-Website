import PropTypes from 'prop-types'
import Image from '@/components/atoms/Image'

export default function Spacer({ type }) {
  return (
    <div className='text-center'>
      {type && type === 'thin' ? (
        <Image src='spacer_thin' width={970} height={100} />
      ) : type && type === 'square' ? (
        <Image src='spacer_square' width={250} height={250} />
      ) : (
        <Image src='spacer' width={970} height={250} />
      )}
    </div>
  )
}

Spacer.propTypes = {
  type: PropTypes.oneOf(['wide', 'square', 'thin']),
}

Spacer.defaultProps = {
  type: 'wide',
}
