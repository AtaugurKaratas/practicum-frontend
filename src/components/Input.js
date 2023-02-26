import React from "react";

const Input = (props) => {
    const { label, id, name, type, onChange, error, disabled, value, hidden } = props;
    return (
        <div className="form-group text-center" hidden={hidden}>
            <label htmlFor={id} className="m-2 d-block">{label}</label>
            <input className={error ? "form-control is-invalid d-inline" : "form-control d-inline"} id={id}
            value={value} name={name} style={{width: '90%'}} type={type} onChange={onChange} disabled={disabled}/>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Input;