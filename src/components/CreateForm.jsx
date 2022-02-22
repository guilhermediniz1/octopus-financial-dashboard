import { useState } from "react";

export default function CreateForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    date: "",
    value: 0,
  });

  function handleForm(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]:
          event.target.type === "radio" ? event.target.id : event.target.value,
      };
    });
  }

  return (
    <div className="form">
      <input
        className="form--name"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleForm}
        type="text"
      />

      <input
        className="form--description"
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleForm}
        type="text"
      />
      <div className="type">
      <p>Type of Transaction</p>
      <div className="radio-group">
      <span className="type--in">
        <input
          type="radio"
          id="in"
          name="type"
          value={formData.type}
          onChange={handleForm}
        />
        <label htmlFor="in">In</label>
      </span>
      <span className="type--out">
        <input
          type="radio"
          id="out"
          name="type"
          value={formData.type}
          onChange={handleForm}
        />
        <label htmlFor="out">Out</label>
      </span>
      </div>
      </div>


      <input
        className="form--date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleForm}
      />
      <input
        className="form--value"
        name="value"
        value={formData.value}
        onChange={handleForm}
        type="number"
      />

      <span className="form--buttons">
        <button
          className="form--submit"
          onClick={() => props.addTransaction(formData)}
        >
          Submit
        </button>
        <button 
        className="form--cancel" 
        onClick={props.toggleAdding}>
          Cancel
        </button>
      </span>
    </div>
  );
}
