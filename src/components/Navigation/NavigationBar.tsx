import React from 'react'
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">Sloovi Task</Link>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar;
