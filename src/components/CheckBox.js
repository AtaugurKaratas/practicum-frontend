import React from 'react'

const CheckBox = (props) => {
    const { id, name, value } = props;
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id={id} value={value} />
            <label className="form-check-label" htmlFor={id}>{name}</label>
        </div>
    )
}

export default CheckBox;