import React from 'react';
import Alert from 'react-bootstrap/Alert';


 const AlertCustom = (props:{type: string; message: string}) => {
  return (
    <Alert key={props.type} variant={props.type}>
            {props.message}
    </Alert>
  )
}

export default AlertCustom;
