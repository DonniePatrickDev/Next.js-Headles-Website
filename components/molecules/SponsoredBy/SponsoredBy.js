import Image from '@/components/atoms/Image'

export default function SponsoredBy() {
  return (
    <>
      <h5 className='text-2xl font-semibold mb-4'>Sponsored by</h5>

      <div className='grid grid-cols-3 md:grid-cols-6 gap-4'>
        <Image src='sponsored_by_Imprivata' width={400} height={400} />

        <Image src='sponsored_by_HCI' width={400} height={400} />

        <Image src='sponsored_by_FHA' width={400} height={400} />

        <Image src='sponsored_by_Clearsense' width={400} height={400} />

        <Image src='sponsored_by_Cerner' width={400} height={400} />

        <Image src='sponsored_by_CereCore' width={400} height={400} />
      </div>
    </>
  )
}
