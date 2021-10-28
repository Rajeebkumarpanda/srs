import React from 'react'
import { NavLink } from 'react-router-dom'
import errorimg from '../image/error.svg';

const Errorpage = () => {
    return (
        <>
        <div id="notfound" className="d-flex justify-content-center align-items-center">
        <img src={errorimg} alt="img" width="500" height="500"/>

            <div className="notfound">
                <div className="notdound-404">
                    <h1>404</h1>
                </div>
                <h2>We are Sorry, page not found!</h2>
                <p className="mb-5">The page you are looking for might have been removed had its name changed or is temoprary unavailable</p>
                <NavLink to="/" className="badge badge-info">Back to Home Page</NavLink>
            </div>
        </div>
            
        </>
    )
}

export default Errorpage
