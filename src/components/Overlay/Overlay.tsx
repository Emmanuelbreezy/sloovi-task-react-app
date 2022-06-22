import React from 'react'

const CustomOverlay = (props:any) => {
  return (
    <div className="overlay-sl-container">
        <div className="d-flex align-items-center justify-content-center h-100">
           {props.children}
        </div>
    </div>
  )
}

export default CustomOverlay;