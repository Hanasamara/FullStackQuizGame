import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

function Option({ option, index, onChange, onRemove }) {
  const handleChange = (e) => {
    onChange(e.target.value,index);
  };

  return (
    <div className='optionitem'>
        <label>
            Option-{index+1}: 
            <input
                type="text"
                value={option}
                onChange={handleChange}
            />
        </label>
        { index >0 &&
            (<IoCloseSharp className='iconx' type="button" onClick={onRemove} />)
        }
    </div>
  );
}

export default Option;
