import In from "../assets/in.svg";
import Out from "../assets/out.svg";
import { useState } from "react";

export default function Transaction(props) {
  const [delOption, setDelOption] = useState(false);
  function enableDeleteOption() {
    setDelOption(true);
  }
  function disableDeleteOption() {
    setDelOption(false);
  }

  return (
    <div
      onMouseEnter={enableDeleteOption}
      onMouseLeave={disableDeleteOption}
      className="transaction"
    >
      <div className="transaction--left">
        <img
          className="transaction--icon"
          src={props.type === "in" ? In : Out}
        />
        <span>
          <p className="transaction--name">{props.name}</p>
          <p className="transaction--description">{props.description}</p>
        </span>
      </div>
      { !delOption ? 
      <div className="transaction--right">
        <p className="transaction--value">{`R$${props.value
          .toFixed(2)
          .replace(".", ",")}`}</p>
        <p className="transaction--date">{props.date}</p>
      </div>
      :
        <button
          onClick={() => props.deleteTransaction(props.id)}
          className="transaction--delete"
        >
          Delete
        </button>
      }
    </div>
  );
}
