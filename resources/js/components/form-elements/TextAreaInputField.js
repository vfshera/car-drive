import React from 'react'

const TextAreaInputField = ({labelText , textareaName , id , cols , rows , placeholder,onChange ,errors}) => {
    return (
        <div className="input-group">
            <label >{labelText}</label>
            <div className="field-errors">{errors}</div>
            <textarea name={textareaName} id={id} cols={cols ?? '25'} rows={rows ?? '10'} onChange={onChange} placeholder={placeholder ?? `Type ${labelText} Here`}/>
        </div>
    )
}

export default TextAreaInputField