import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

function Input(props) {
  const { value, bind, reset } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting answer ${value}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {props.label}:
        <input type="text" {...bind} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Input;
