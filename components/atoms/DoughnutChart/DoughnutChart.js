import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({ responses }) {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const options = {
    aspectRatio: 3,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 80,
        },
      },
    },
    animation: false,
  }

  const labels = []
  const data = []

  Object.keys(responses).map((key) => {
    labels.push(key)
    data.push(responses[key])
  })

  const analyticsJson = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#e11d48',
          '#9333ea',
          '#2563eb',
          '#0d9488',
          '#65a30d',
          '#db2777',
          '#7c3aed',
          '#0369a1',
          '#10b981',
          '#facc15',
          '#f97316',
        ],
      },
    ],
  }

  return <Doughnut options={options} data={analyticsJson} />
}
