
export default function Total(props) {
  return (
    <div className="total card">
      <h1 className="card--title">Balance</h1>
      <p className="total--value">{`R$${props.data.funds.toFixed(2).replace('.',',')}`}</p>
    </div>
  );
}
