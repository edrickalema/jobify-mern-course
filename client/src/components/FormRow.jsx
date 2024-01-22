import React from "react";

function FormRow({ type, id, name, labelText, defaultValue, onChange }) {
  return (
    <div className='form-row'>
      <label htmlFor='name' className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        required
        name={name}
        id={id}
        className='form-input'
        defaultValue={defaultValue || ""}
        onChange={onChange}
      />
    </div>
  );
}

export default FormRow;
