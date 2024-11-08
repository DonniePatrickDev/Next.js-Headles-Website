import cn from 'classnames'
import styles from './AnalyticsFirmographics.module.scss'

export default function AnalyticsFirmographics({
  survey,
  responses,
  selectedFirmographics,
  setSelectedFirmographics,
}) {
  const firmographics = []

  if (survey?.result?.embeddedData && responses) {
    survey?.result?.embeddedData?.map((embedded) => {
      const fgValues = []

      responses.map((response) => {
        if (
          response.values[embedded.name] &&
          !fgValues.includes(response.values[embedded.name])
        ) {
          fgValues.push(response.values[embedded.name])
        }
      })
      firmographics.push({ name: embedded.name, values: fgValues })
    })
  }

  function handleSelectFirmographics(fgName, fgValue) {
    const fgTmp = { ...selectedFirmographics }

    if (fgTmp[fgName]) {
      if (fgTmp[fgName].includes(fgValue)) {
        fgTmp[fgName] = fgTmp[fgName].filter((val) => val !== fgValue)
      } else {
        fgTmp[fgName].push(fgValue)
      }
    } else {
      fgTmp[fgName] = [fgValue]
    }

    setSelectedFirmographics(fgTmp)
  }

  return (
    <>
      <h3 className={styles.title}>{survey?.result?.name}</h3>

      <div className='accordion'>
        {firmographics &&
          firmographics
            ?.filter((f) => f.values?.length > 0)
            .map((fg, fgIndex) => (
              <div key={fgIndex} className={styles.firmographics}>
                <h2 id={`heading${fgIndex}`}>
                  <button
                    className={cn(
                      'accordion-button rounded relative flex items-center w-full py-4 px-5 text-base text-white bg-purple text-left border-0 transition focus:outline-none',
                      fgIndex !== 0 && 'collapsed'
                    )}
                    data-bs-toggle='collapse'
                    data-bs-target={`#collapse${fgIndex}`}
                    aria-expanded={fgIndex !== 0 ? 'false' : 'true'}
                    aria-controls={`#collapse${fgIndex}`}
                  >
                    <span>{fg.name?.split('_').join(' ')}</span>
                  </button>
                </h2>

                <div
                  id={`collapse${fgIndex}`}
                  className={cn(
                    'accordion-collapse',
                    fgIndex !== 0 && 'collapse'
                  )}
                  aria-labelledby={`#heading${fgIndex}`}
                >
                  {fg.values.map((value, valIndex) => (
                    <div
                      key={valIndex}
                      onClick={() => handleSelectFirmographics(fg.name, value)}
                      className={cn(
                        styles.item,
                        selectedFirmographics[fg.name]?.includes(value) &&
                          styles.active
                      )}
                    >
                      <input
                        type='checkbox'
                        className={styles.check}
                        checked={selectedFirmographics[fg.name]?.includes(
                          value
                        )}
                        readOnly
                      />

                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </>
  )
}
