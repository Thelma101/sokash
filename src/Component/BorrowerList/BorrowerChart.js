import React, {useState} from 'react'
import { Line } from '@reactchartjs/react-chart.js'


export default function BorrowerListCharts(){
    const [datas, setdatas] = useState({})
    const data = {
        labels: ['Jan', 'Feb', 'May', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: '# ',
            data: [120, 190, 300, 500, 200, 300, 400, 500, 1000, 600,800,1200],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      }
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        }}
      
 return( <>
    <div className='header'>
      <h1 className='title, loanperform'>Borrowers List Statistics</h1>
      <div className='links'>
     </div>
    </div>
    <Line data={data} options={options} />
  </>
)

}