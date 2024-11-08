import CardCarousel from '@/components/molecules/CardCarousel'
import PortalCard from '@/components/molecules/PortalCard'
import Link from 'next/link'
import cn from 'classnames'
import { useState } from 'react'
import styles from './PortalDashboardProjects.module.scss'

export default function PortalDashboardProjects({
  analytics,
  reports,
  surveys,
  carousel,
}) {
  const projects = [...analytics, ...reports, ...surveys].sort((a, b) => {
    if (a.created_at > b.created_at) {
      return 1
    } else {
      return -1
    }
  })

  const [page, setpage] = useState(1)

  return (
    <div className='mb-12'>
      <h4 className='text-lg font-semibold text-gray'>Projects</h4>

      <p className='text-lg text-gray mb-5'>
        Your library of activity inside the Digital Health Analytics portal.
        Easily access your saved queries, reports, and surveys you are
        participating in.
      </p>

      <div className='overflow-hidden'>
        <div
          className={cn(
            'flex flex-row gap-6 ease-in-out transition duration-200',
            !carousel && 'flex-wrap'
          )}
          style={
            carousel && {
              transform: `translateX(calc(-${100 * (page - 1)}% - ${
                24 * (page - 1)
              }px))`,
            }
          }
        >
          {projects?.length > 0 &&
            projects.map((project, index) => {
              if (project.analysis_name) {
                return (
                  <PortalCard
                    key={index}
                    date={project.created_at}
                    type='Analytics'
                    tags={['custom']}
                    view={`/portal/analytics/${project.pk}`}
                    className={styles.card}
                  >
                    <h4 className='text-lg font-semibold mb-3'>
                      {project?.analysis_name}
                    </h4>
                  </PortalCard>
                )
              } else if (project.report_name) {
                return (
                  <PortalCard
                    key={index}
                    date={project.created_at}
                    type='Reports'
                    tags={['custom']}
                    view={`/portal/reports/${project.pk}`}
                    className={styles.card}
                  >
                    <h4 className='text-lg font-semibold mb-3'>
                      {project?.report_name}
                    </h4>
                  </PortalCard>
                )
              } else {
                return (
                  <PortalCard
                    key={index}
                    date={project.created_at}
                    type='Survey'
                    tags={[project.survey_id ? 'Active' : 'Pending']}
                    view={
                      project.survey_id
                        ? `/portal/surveys/${project.survey_id}`
                        : null
                    }
                    className={styles.card}
                  >
                    <h4 className='text-lg font-semibold mb-3'>
                      {project.data?.title
                        ? project.data?.title
                        : 'No Name defined'}
                    </h4>
                  </PortalCard>
                )
              }
            })}

          <PortalCard background={true} className={styles.card}>
            <h4 className='text-xl text-white font-semibold mb-3'>
              <Link href='/portal/projects/new/'>Create a Project</Link>
            </h4>
          </PortalCard>
        </div>
      </div>

      {carousel && (
        <div className='flex justify-end py-4'>
          <div className='hidden lg:block'>
            <CardCarousel
              currentPage={page}
              totalCount={projects?.length + 1}
              pageSize={3}
              onPageChange={(page) => setpage(page)}
            />
          </div>
          <div className='lg:hidden max-w-full'>
            <CardCarousel
              currentPage={page}
              totalCount={projects?.length + 1}
              pageSize={1}
              onPageChange={(page) => setpage(page)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
