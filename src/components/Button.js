import React from 'react'

const Button = (props) => {
    const { onClick, name } = props
    return (
        <div className="text-center">
            <button className="btn btn-primary m-3" onClick={onClick} >{name}</button>
        </div>
    )
}
export default Button