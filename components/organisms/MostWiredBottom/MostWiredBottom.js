import Divider from '@/components/atoms/Divider/Divider'
import SponsoredBy from '@/components/molecules/SponsoredBy'
import PortalFAQ from '../PortalFAQ'

export default function MostWiredHero() {
  return (
    <div className='container'>
      <Divider color='purple' />

      <div className='my-12'>
        <h2 className='text-2xl text-purple-dark font-bold mb-4'>
          Certification Level Definitions
        </h2>

        <p className='mb-4'>
          <strong>Levels 9–10:</strong> In addition to meeting the criteria for
          levels 1–8, organizations in level 9 or 10 are often leaders in
          healthcare technology who actively push the industry forward. Not only
          have many of them implemented advanced technologies, but they often
          leverage these technologies in innovative ways and have encouraged
          deep adoption across their entire organization. As a result, they are
          realizing meaningful outcomes, including improved quality of care,
          improved patient experience, reduced costs, and broader patient access
          to healthcare services. Some of the advanced technologies used to
          achieve these outcomes include telehealth solutions,
          price-transparency and cost-analysis tools, access to data at the
          point of care, and tools to engage patients and their families
          throughout the care process.
        </p>

        <p className='mb-4'>
          <strong>Levels 7–8:</strong> Organizations in levels 7 and 8 meet the
          criteria for being designated as Most Wired. These organizations have
          deployed technologies and strategies (e.g., population
          health/cost-of-care analytics, HIEs/integration engines, and patient
          portals) to help them analyze their data and are starting to achieve
          meaningful clinical and efficiency outcomes. Some of these
          organizations are experimenting with more advanced technologies, like
          telehealth, that expand access to care.
        </p>

        <p className='mb-4'>
          <strong>Levels 4–6:</strong> Organizations in levels 4–6 have made
          progress in expanding their core IT infrastructure to support internal
          strategic initiatives. Often, they have implemented basic technologies
          to protect patients’ health and financial information (e.g.,
          firewalls, spam/phishing filters, endpoint encryption), but they may
          lack more advanced technologies that would mediate other
          vulnerabilities. Many are actively collecting patient data
          electronically; however, they may not effectively leverage the data
          they collect and may encounter significant barriers in exchanging
          patient data with external organizations.
        </p>

        <p className='mb-4'>
          <strong>Levels 1–3:</strong> Organizations in levels 1–3 are in the
          early stages of developing their technology infrastructure and may
          still be transitioning, or may have more recently transitioned, to
          electronic formats for collecting patient data and performing clinical
          activities. Some may have deployed technologies that capture data
          (e.g., EMRs, ERP solutions, revenue cycle management solutions) but
          may not fully leverage the functionality these technologies offer.
          Additionally, these organizations may still be working to help end
          users adopt the technologies that have been implemented.
        </p>
      </div>

      <Divider color='purple' />

      <PortalFAQ />

      <Divider color='purple' />

      <div className='my-12'>
        <h2 className='text-2xl text-purple-dark font-bold mb-4'>
          Past Results
        </h2>

        <div className='block mb-3'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2021/11/ACUTE-v6.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            2020 Acute Recognized Organizations
          </a>
        </div>

        <div className='block mb-3'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2021/10/AMBULATORY-.jpg'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            2020 Ambulatory Recognized Organizations
          </a>
        </div>

        <div className='block mb-10'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2020/10/Most-Wired-Level-7-9-Long-Term-Care.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            2020 Long Term Care Recognized Organizations
          </a>
        </div>

        <div className='block mb-3'>
          <a
            href='https://dhix.dhinsights.org/wp-content/uploads/2022/03/Digital-Health-Most-Wired_National-Trends-2020.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            2020 National Trends Report
          </a>
        </div>

        <div className='block mb-12'>
          <a
            href='https://dhix.dhinsights.org/wp-content/uploads/2022/03/Most-Wired-2020-Digital-Suppliment.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            2020 Digital Supplement
          </a>
        </div>

        <p className='mb-8'>
          In 2019, an improved system was introduced that allows participating
          organizations to better benchmark their level of adoption and outcomes
          achieved. These certification levels will help ensure that the Most
          Wired program continues to be a catalyst for technology adoption that
          improves patient outcomes and engagement. Every participating
          organization will be certified at a level that represents their
          respective achievements. Levels are based solely on an organizations
          raw score without consideration for how this score compares to the
          scores of other participants.
        </p>

        <div className='block mb-4'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2019/09/Level-7-10.pdf'
            target='_blank'
            rel='noreferrer'
            className='inline-flex rounded-full text-dark hover:text-white bg-purple-light hover:bg-purple py-3 px-6'
          >
            2019 Recognized Organizations
          </a>
        </div>

        <div className='block mb-4'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2020/01/CHIME-Most-Wired-National-Trends-2019-FINAL.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            Healthcare’s Most Wired: National Trends 2019
          </a>
        </div>

        <div className='block mb-12'>
          <a
            href='http://www.modernhealthcare.com/MostWired'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            Healthcare’s Most Wired Articles
          </a>
        </div>

        <div className='block mb-4'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2018/11/Alpha-list-for-supplement.xlsx'
            target='_blank'
            rel='noreferrer'
            className='inline-flex rounded-full text-dark hover:text-white bg-purple-light hover:bg-purple py-3 px-6'
          >
            2018 RECOGNIZED Organizations
          </a>
        </div>

        <div className='block mb-4'>
          <a
            href='https://chimecentral.org/wp-content/uploads/2018/10/Healthcares-Most-Wired%E2%80%94National-Trends-2018-FINAL.pdf'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            Most Wired: National Trends 2018
          </a>
        </div>

        <div className='block mb-4'>
          <a
            href='https://www.modernhealthcare.com/section/mostwired'
            target='_blank'
            rel='noreferrer'
            className='text-xl text-purple border-b'
          >
            Modern Healthcare: Special Custom Section
          </a>
        </div>
      </div>
      <Divider color='purple' />

      <div className='my-16'>
        <SponsoredBy />
      </div>
    </div>
  )
}
