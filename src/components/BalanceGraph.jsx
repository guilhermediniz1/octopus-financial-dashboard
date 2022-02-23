import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import emptyIcon from '../assets/emptyIcon.svg'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BalanceGraph(props) {
  const [empty, setEmpty] = useState()

  useEffect(() =>{
    if(props.inValue == 0 && props.outValue == 0){
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  },[props.inValue, props.outValue])

  return (
    <div className="balanceGraph card">
      <h1 className="card--title">Balance Graph</h1>
      {empty ? <img src={emptyIcon} className="icon--empty"/> :
      <Doughnut 
      options={
        {
          responsive: true,
          maintainAspectRatio: false
        }
      }

      height={100}
      width={50}
      redraw={true}
      data={{
        labels: ['In','Out'],
        datasets: [
          {
            label: 'In & Out',
            data: [props.inValue, props.outValue],
            backgroundColor: ["#ffd100", "#d6d6d6"],
            borderColor: ['#ffd100', "#d6d6d6"],
            borderWidth: 1,
          },
        ],
      }} 
      /> }
    </div>
  );
}
