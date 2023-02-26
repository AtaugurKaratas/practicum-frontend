import React from 'react'

const Label = (props) => {
    const { name } = props;
    return (
        <label className='d-block'>
            {name}
        </label>
    )
}

export default Label;