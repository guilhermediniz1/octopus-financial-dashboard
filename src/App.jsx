import Total from "./components/Total";
import TransactionsCard from "./components/TransactionsCard";
import BalanceGraph from "./components/BalanceGraph";
import backgorundImage from "./assets/imgBg.svg";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function App() {
  const [data, setData] = useState(
    JSON.parse(window.localStorage.getItem("data")) || { funds: 0 }
  );
  const [inValue, setInValue] = useState(JSON.parse(window.localStorage.getItem("inValue")) || 0)
  const [outValue, setOutValue] = useState(JSON.parse(window.localStorage.getItem("outValue")) || 0)
  const [transactions, setTransactions] = useState(
    JSON.parse(window.localStorage.getItem("transactions")) || []
  );
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
    window.localStorage.setItem("transactions", JSON.stringify(transactions));
    window.localStorage.setItem("inValue", JSON.stringify(inValue));
    window.localStorage.setItem("outValue", JSON.stringify(outValue));
  }, [data, transactions, inValue, outValue]);

  function addTransaction(formData) {
    const newTransaction = {
      id: nanoid(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      date: (formData.date).replaceAll("-","/"),
      value: parseFloat(formData.value)
    }
    setTransactions(prevTransactions => {
      return[newTransaction,...prevTransactions]
    })
    setData(prevData => {
      return {
        funds: newTransaction.type === "in" ? 
        prevData.funds + newTransaction.value :
        prevData.funds - newTransaction.value
      }
    })
    setInValue(prevInValue => 
      newTransaction.type === "in" ?
      prevInValue += newTransaction.value : 
      prevInValue += 0
      )
    setOutValue(prevOutValue => 
      newTransaction.type === "out" ?
      prevOutValue += newTransaction.value : 
      prevOutValue += 0
      )
    toggleAdding()
  }

  function toggleAdding(){
    setIsAdding(prevState => !prevState)
  }

  function deleteTransaction(transactionId) {
    const deletedTransaction = transactions.find(tr => tr.id === transactionId)
    setData(prevData => {
      return {
        funds: deletedTransaction.type === "in" ? 
        prevData.funds - deletedTransaction.value :
        prevData.funds + deletedTransaction.value
      }
    })
    setInValue(prevInValue => deletedTransaction.type === "in" ? 
    prevInValue - deletedTransaction.value :
    prevInValue)
    setOutValue(prevOutValue => deletedTransaction.type === "out" ? 
    prevOutValue - deletedTransaction.value :
    prevOutValue)

    setTransactions((prevTransactions) => prevTransactions.filter((tr) => tr.id != transactionId));
  } 

  return (
    <>
      <div className="grid-container">
        <Total data={data} />
        <TransactionsCard
          transactions={transactions}
          addTransaction={addTransaction}
          isAdding={isAdding}
          toggleAdding={toggleAdding}
          deleteTransaction={deleteTransaction}
        />
        <BalanceGraph 
        inValue = {inValue} 
        outValue = {outValue}/>
      </div>
      <img className="background-image" src={backgorundImage} />
    </>
  );
}
