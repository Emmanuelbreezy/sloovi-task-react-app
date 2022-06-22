import React from 'react'
import NavigationBar from '../components/Navigation/NavigationBar';

interface DefaultLayoutProps {
    children:any
}

export default function DefaultLayout(props:DefaultLayoutProps) {
 
    return (
        <>
          <NavigationBar />
          <div className="main--container parent">{props.children}</div>
        </>
    )
}

