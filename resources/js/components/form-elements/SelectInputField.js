import React from 'react'

const SelectInputField = ({labelText , selectName , selectID , selectOptions , parentClasses, onChange , errors,ref}) => {
    return (
        <div className={parentClasses ? `input-group ${parentClasses}` : 'input-group'}>
            <label >{labelText}</label>
            <div className="field-errors">{errors}</div>
            <select name={selectName} id={selectID} onChange={onChange} ref={ref}>
                <option value='' selected disabled>Choose {labelText}</option>
                {selectOptions.map((opt,index) => (
                     <option value={opt.id} key={index} >{opt.name}</option>
                ))}

            </select>
        </div>
    )
}

export default SelectInputField