import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BalanceGraph(props) {
  return (
    <div className="balanceGraph card">
      <h1 className="card--title">Balance Graph</h1>
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
      />
    </div>
  );
}
