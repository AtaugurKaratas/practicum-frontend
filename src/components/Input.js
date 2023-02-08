import React from "react";

const Input = (props) => {
    const { label, id, name, type, onChange, error } = props;
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input className={error ? "form-control is-invalid" : "form-control"} id={id} name={name} type={type} onChange={onChange}/>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}

export default Input;