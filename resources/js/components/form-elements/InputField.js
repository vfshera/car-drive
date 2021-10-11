import React from 'react'

const InputField = ({ labelText , type ,name,id, classes , placeholder , parentClasses ,onBlur, onChange ,errors, step ,max ,ref}) => {



    return (
        <div className={parentClasses ? `input-group ${parentClasses}` : 'input-group'}>
            <label  >{labelText}</label>
            <div className="field-errors">{errors}</div>
            {(type === 'number') ? (
                <input type='number' name={name} id={id} min='1' step={step ?? '1'}  ref={ref} max={max} pattern="{0-9}" onBlur={onBlur} onChange={onChange} className={classes} placeholder={placeholder ?? `Type ${labelText} Here`} />
            ) : (
                <input type={type ?? 'text'} name={name} id={id} onChange={onChange} ref={ref} className={classes} placeholder={placeholder ?? `Type ${labelText} Here`} />
            )}

        </div>
    )
}

export default InputField