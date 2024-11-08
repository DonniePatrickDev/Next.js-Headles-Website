import Background from '@/components/atoms/Background'
import HubspotForm from '@/components/atoms/HubspotForm'
import Layout from '@/components/common/Layout'

export default function Page() {
  return (
    <Layout>
      <div className='relative'>
        <Background image='contact_background' />

        <div className='container grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-16 py-20'>
          <div className='flex flex-col h-full justify-between'>
            <div>
              <h1 className='text-4xl font-bold text-white my-12'>
                Market Research + Portal
              </h1>

              <p className='mb-6 text-white text-xl'>
                Upgrade for access to unlimited reports, analysis, market
                studies, and pulse surveys.
              </p>
            </div>
          </div>

          <div className='px-6 md:px-16 py-8 bg-white shadow-lg'>
            <div className='my-4'>
              <HubspotForm
                formId='9088c1d9-562e-44d3-ae6f-b140e2f633d7'
                className='contact-us'
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
