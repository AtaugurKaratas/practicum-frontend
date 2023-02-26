import React from 'react'

const AssetImage = (props) => {
    const { className, image, id, width, height } = props;
    const defaultImage = "https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg";
    return (
        <div className="form-group text-center">
            <img className={className} id={id} width={width} height={height} src={image ? image : defaultImage} alt='#' />
        </div>
    )
}

export default AssetImage;