import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react'
import { Serializer } from 'survey-core'
// import '@/styles/survey-core.css'
// import '@/styles/survey-creator-core.css'
import styles from './SurveyForm.module.scss'
import Button from '@/components/atoms/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function SurveyForm({ designer, initialData }) {
  const router = useRouter()

  const { data: session } = useSession()
  const email = session?.email

  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState({ status: '', msg: '' })

  async function handleCreateSurvey() {
    const survey_history = JSON.parse(
      window.localStorage.getItem(`survey_history`)
    )

    setSaving(true)
    setSaveStatus({
      status: '',
      msg: '',
    })

    try {
      const res = await fetch('https://backend.dhanalytics.org/api/surveys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          data: survey_history,
        }),
      })

      if (res.status === 201) {
        setSaving(false)
        setSaveStatus({
          status: 'success',
          msg: 'Your Survey has been created successfully',
        })
        router.push('/portal/surveys/my-survey')
      } else {
        setSaving(false)
        setSaveStatus({
          status: 'error',
          msg: 'Internal server error. Please try again',
        })
      }
    } catch (error) {
      setSaving(false)
      setSaveStatus({
        status: 'error',
        msg: 'Internal server error. Please try again',
      })
    }
  }

  if (typeof window !== 'undefined') {
    Serializer.removeProperty('panelbase', 'visibleIf')
    Serializer.removeProperty('question', 'visibleIf')

    const options = {
      showDesignerTab: designer,
      showJSONEditorTab: false,
      showLogicTab: false,
      isAutoSave: true,
      // questionTypes: [
      //   'text',
      //   'comment',
      //   'multipletext',
      //   'expression',
      //   'imagepicker',
      //   'checkbox',
      //   'radiogroup',
      //   'dropdown',
      //   'rating',
      //   'ranking',
      //   'matrix',
      //   'matrixdropdown',
      // ],
    }

    const creator = new SurveyCreator(options)

    creator.onShowingProperty.add(function (sender, options) {
      if (options.obj.getType() == 'survey') {
        options.canShow = options.property.name == 'title'
      }
    })

    creator.JSON = initialData
    // window.localStorage.setItem(`survey_history`, creator.text)
    creator.saveSurveyFunc = function (saveNo, callback) {
      window.localStorage.setItem(`survey_history`, creator.text)

      !!callback && callback(saveNo, true)
    }

    return (
      <>
        <div className='mb-12 p-1 shadow bg-white'>
          {creator && <SurveyCreatorComponent creator={creator} />}
        </div>

        {designer && (
          <div className='flex justify-end'>
            <Button
              type='primary'
              size='lg'
              text='Submit Survey'
              onClick={handleCreateSurvey}
              disabled={saving}
            />
          </div>
        )}

        {saveStatus.status === 'error' && (
          <p className='text-red text-right mt-3'>{saveStatus.msg}</p>
        )}

        {saveStatus.status === 'success' && (
          <p className='text-purple text-right mt-3'>{saveStatus.msg}</p>
        )}
      </>
    )
  }

  return <div className={styles.root}></div>
}
