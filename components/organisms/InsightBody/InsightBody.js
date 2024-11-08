import HTMLContent from '@/components/atoms/HTMLContent'
import HubspotForm from '@/components/atoms/HubspotForm'
import Ad from '@/components/molecules/Ad'
import InsightSocial from '@/components/molecules/InsightSocial'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import styles from './InsightBody.module.scss'

export default function InsightBody({ article, topic, subscribed }) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className='flex-initial w-full md:w-3/4'>
          {subscribed || !article.acf?.login_required === '1' ? (
            <>
              <Ad
                ad_image={topic.acf?.ad_top?.ad_image}
                ad_link={topic.acf?.ad_top?.ad_link}
                classes={topic.acf?.ad_top?.ad_tracking_classes}
              />

              <div className={styles.content}>
                <HTMLContent content={article.content?.rendered} />
              </div>

              <InsightSocial
                slug={article.slug}
                title={article.title?.rendered.replace('&#8230;', '.')}
                type='insight'
              />
            </>
          ) : (
            <>
              <h3 className='text-lg text-dark font-semibold uppercase'>
                Access the report
              </h3>

              <div className={styles.form}>
                <div className={styles.formInner}>
                  <div className='p-3 bg-gray-200 text-dark text-xl text-center'>
                    Read the full report
                  </div>

                  <div className='p-8'>
                    <p className='text-center mb-6'>
                      Want to keep reading? Subscribers get exclusive access to
                      DHI's extensive library of content, covering top-of-mind
                      issues and trends for today's healthcare executive.
                    </p>

                    <HubspotForm
                      formId={article.acf.hubspot_guid}
                      /*
                      {
                        article.slug ===
                          'providence-st-joseph-health-data-integration-strategy-key-to-successful-ehr-conversion'
                          ? '91b7677a-07d8-49a2-adc2-d649c6d8ec66'
                          : article.slug ===
                            'two-ways-ehr-data-quality-affects-a-providers-care'
                            ? '1951f493-8783-4980-a1a9-36f1f80deacd'
                            : article.slug === '1085'
                              ? '284c9fe1-b1bd-4934-8475-2268bc1f0a29'
                              : article.slug ===
                                '3-keys-to-a-successful-healthcare-communication-platform'
                                ? '8388c7c6-d84d-41bd-a6cc-59bdfcad4d9f'
                                : 'ecc8bfda-c83d-4615-90d6-a13a34f23baf'
                      }*/
                      action='subscribe'
                      className='article-subscribe'
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <SidebarSubscribe />
        </div>
      </div>
    </div>
  )
}
