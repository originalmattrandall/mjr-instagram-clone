import React from 'react'
import Authenticate from '../authenticate'
import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header--brand'>
                Instagram
            </div>
            <div className='header--login'>
                <Authenticate />
            </div>
        </div>
    )
}

export default Header