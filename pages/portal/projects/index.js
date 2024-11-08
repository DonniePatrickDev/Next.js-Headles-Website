import Divider from '@/components/atoms/Divider/Divider'
import Loading from '@/components/atoms/Loading'
import PortalLayout from '@/components/common/PortalLayout'
import MarketInsightsAll from '@/components/organisms/MarketInsightsAll'
import PortalAnnouncements from '@/components/organisms/PortalAnnouncements'
import PortalDashboardAnalytics from '@/components/organisms/PortalDashboardAnalytics'
import PortalDashboardDHMWReports from '@/components/organisms/PortalDashboardDHMWReports'
import PortalDashboardProjects from '@/components/organisms/PortalDashboardProjects'
import PortalDashboardReports from '@/components/organisms/PortalDashboardReports'
import PortalDashboardSurveys from '@/components/organisms/PortalDashboardSurveys'
import PortalMembershipPanel from '@/components/organisms/PortalMembershipPanel'
import {
  getAnalytics,
  getMySurveys,
  getReports,
  getResults,
  getSurveys,
} from '@/functions/qualtrics/fetchData'
import { getPortalSettings } from '@/functions/wordpress/fetchData'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Page() {
  const { data: session } = useSession()
  const email = session?.email
  const level = session?.membership?.level

  /**
   * Ads
   */
  const [adImage, setAdImage] = useState('')
  const [adLink, setAdLink] = useState('')
  const [adClasses, setAdClasses] = useState('')

  const { data: portalSettings } = getPortalSettings()

  useEffect(() => {
    setAdImage(portalSettings?.acf?.dashboard_ads[0]?.ad_image)
    setAdLink(portalSettings?.acf?.dashboard_ads[0]?.ad_link)
    setAdClasses(portalSettings?.acf?.dashboard_ads[0]?.ad_tracking_classes)
  }, [portalSettings])

  /**
   * Reports
   */
  const { data: reports } = getResults(email)
  const { data: myReports } = getReports(email)

  /**
   * Surveys
   */
  const { data: surveysData } = getSurveys()
  const surveys = surveysData?.result?.elements

  const [peerSurveys, setPeerSurveys] = useState([])
  const [industrySurveys, setIndustrySurveys] = useState([])
  const [pulseSurveys, setPulseSurveys] = useState([])

  const { data: mySurveys } = getMySurveys(email)

  useEffect(() => {
    const tmpIndustrySurveys = []
    const tmpPeerSurveys = []
    const tmpPulseSurveys = []

    Array.isArray(surveys) &&
      surveys.map((survey) => {
        if (survey.id === 'SV_2nouxmu1umbGCZE') {
          tmpPeerSurveys.push(survey)
          tmpPulseSurveys.push(survey)
        } else if (survey.id === 'SV_8k8gtgvxsVEgo1E') {
          tmpIndustrySurveys.push(survey)
        }
      })

    setPeerSurveys(tmpPeerSurveys)
    setIndustrySurveys(tmpIndustrySurveys)
    setPulseSurveys(tmpPulseSurveys)

    return () => {
      setPeerSurveys([])
      setIndustrySurveys([])
    }
  }, [surveys])

  /**
   * Analytics
   */
  const { data: analytics } = getAnalytics(email)

  return (
    <PortalLayout>
      <div className='max-w-5xl'>
        <PortalAnnouncements level={level} />

        <h3 className='text-purple-dark text-xl font-bold mb-8'>
          MY DASHBOARD
        </h3>

        {session && reports && (
          <PortalMembershipPanel
            membership={session?.membership}
            level={level}
            organization={reports[0]?.organization_name}
          />
        )}

        {reports ? (
          <PortalDashboardDHMWReports
            reports={reports[0]}
            level={level}
            showMy={false}
            showNational={true}
            carousel={true}
          />
        ) : (
          <Loading />
        )}

        {analytics ? (
          <PortalDashboardAnalytics
            analytics={analytics}
            title='Analytics'
            subtitle={
              level?.includes('provider-plus')
                ? 'Unlimited queries of the DHMW database across our pre-selected variables and gain exclusive access to custom benchmarking insights.  '
                : 'Query the DHMW database across our pre-selected variables and gain exclusive access to custom market intelligence and survey segment trends specific to your scope of business. '
            }
            carousel={true}
            level={level}
          />
        ) : (
          <Loading />
        )}

        {mySurveys && surveys && (
          <PortalDashboardSurveys
            title={
              level?.includes('market-research')
                ? 'Market Studies & Industry Surveys'
                : 'Peer & Industry Surveys'
            }
            subtitle={
              level?.includes('market-research')
                ? 'Create up to 2 Pulse and 1 Market Research surveys during your subscription period. Also, your survey library provides an overview of active, open access surveys created by Provider members.'
                : level?.includes('provider-plus')
                ? 'Participate in surveys created by your peers and from other industry sources. You can also create your own surveys of peers and other industry professionals.'
                : 'Participate and provide feedback to current industry research projects. Upgrade to Provider + to create custom surveys to your colleagues.'
            }
            peerSurveys={peerSurveys}
            industrySurveys={industrySurveys}
            pulseSurveys={pulseSurveys}
            membershipCard={true}
            level={level}
            mySurveyNum={mySurveys.length}
          />
        )}

        {myReports && (
          <PortalDashboardReports
            reports={myReports}
            level={level}
            title='Reports'
            subtitle={
              level === 'provider'
                ? 'Access PDF copies of your saved queries to our databases. You are allowed three (3) reports with your DHMW participant account. Upgrade to Provider + to save more custom reports.'
                : level === 'market-research'
                ? 'Access PDF copies of the Most Wired Database. Upgrade to Market Research + to create custom reports.'
                : 'Access PDF copies of your saved queries to our databases and download for easy reference.'
            }
          />
        )}

        {analytics && myReports && mySurveys && level !== 'market-research' && (
          <PortalDashboardProjects
            analytics={analytics}
            reports={myReports}
            surveys={mySurveys}
            carousel={true}
          />
        )}

        <Divider color='purple' />

        <MarketInsightsAll
          ad_image={adImage}
          ad_link={adLink}
          classes={adClasses}
          level={level}
        />
      </div>
    </PortalLayout>
  )
}
