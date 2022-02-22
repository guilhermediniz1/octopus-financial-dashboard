import Transaction from "./Transaction";
import CreateForm from "./CreateForm";
export default function TransactionsCard(props) {
  const transactionElements = props.transactions.map((op) => {
    return (
      <Transaction
        key={op.id}
        id={op.id}
        date={op.date}
        description={op.description}
        name={op.name}
        type={op.type}
        value={op.value}
        deleteTransaction={props.deleteTransaction}
      />
    );
  });

  return (
    <div className="transactions card">
      <h1 className="card--title">Transactions</h1>
      {props.isAdding  || props.transactions.length < 0 ? (
        <>
          <div className="transactions--content">{transactionElements}</div>
          <button 
          onClick={props.toggleAdding}
          className="button--add">
            <p className="button--text">Add Transaction</p>
          </button>
        </>
      ) : (
        <CreateForm 
        toggleAdding={props.toggleAdding}
        addTransaction={props.addTransaction}/>
      )}
    </div>
  );
}
