import React from "react";

function FormSelectRow({ name,list, labelText, defaultValue = "" }) {
  return (
    <div className='form-row'>
      <label htmlFor='jobStatus' className='form-label'>
        {labelText || name}
      </label>

      <select
        name={name}
        className='form-select'
        id={name}
        defaultValue={list.PENDING}
      >
        {Object.values(list).map((jobStatus) => {
          return (
            <option key={jobStatus} value={jobStatus}>
              {jobStatus}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormSelectRow;
