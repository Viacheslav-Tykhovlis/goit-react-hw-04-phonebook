import React from 'react';

export const Filter = ({ value, onChange }) => {
  return (
    <label>
      Find contact by name <br />
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};
