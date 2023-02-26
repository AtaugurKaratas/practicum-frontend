import React from 'react'

const ProfileImage = (props) => {
  const { className, image, id, width, height } = props;
    const defaultImage = "https://m.media-amazon.com/images/I/41jLBhDISxL._SY355_.jpg";
  return (
    <div className="form-group text-center">
        <img className={className} id={id} width={width} height={height} src={image ? image : defaultImage} alt='#'/>
    </div>
  )
}

export default ProfileImage;