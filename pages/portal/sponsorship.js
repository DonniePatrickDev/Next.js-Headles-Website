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
                Digital Health Most Wired Survey Sponsorship
              </h1>

              <p className='mb-6 text-white text-xl'>
                Our sponsorship program guarantees exclusive alignment between
                your organization and a concentrated segment of the Digital
                Health Most Wired Survey, so spots are limited. This opportunity
                includes key benefits such as access to the de-identified data
                associated with your segment, participation in CHIME member
                events regarding the survey and recognition opportunities, and
                the promotion of your brand throughout the survey process and
                inside the DHA portals. Fill out the form to get connected with
                our team about this exciting opportunity.
              </p>
            </div>
          </div>

          <div className='px-6 md:px-16 py-8 bg-white shadow-lg'>
            <div className='my-4'>
              <HubspotForm
                formId='45d19895-300e-4f0e-9e66-f195efc53b39'
                className='contact-us'
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
