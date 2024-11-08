import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

export default function HorizontalChart({ responses }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    indexAxis: 'y',
    responsive: true,
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

  return <Bar options={options} data={analyticsJson} />
}
