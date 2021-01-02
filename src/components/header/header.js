import React from 'react'
import SignUpButton from '../sign-up-button'
import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header--brand'>
                Instagram
            </div>
            <div className='header--login'>
                <SignUpButton />
            </div>
        </div>
    )
}

export default Header