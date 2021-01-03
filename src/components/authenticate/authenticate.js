import React, { useState, useEffect } from 'react'
import { auth } from '../../utils/firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import './authenticate.css'

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Authenticate = () => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [openSignUp, setOpenSignUp] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                console.log(authUser)
                setUser(authUser)
            } else {
                // Logged out
                setUser(null)
            }
        })

        return () => {
            // Can handle some clean up here
            unsubscribe()
        }
    }, [user, username])

    const signUp = event => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch(error => alert(error.message))

        setOpenSignUp(false)
    }

    const signIn = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                alert(error.message)
            })

        setOpenSignIn(false)
    }

    return (
        <>
            <Modal
                open={openSignUp}
                onClose={() => setOpenSignUp(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='sign-up-button__form'>
                        <Input
                            placeholder='username'
                            type='text'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <Input
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Button type='submit' onClick={signUp}>Complete!</Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='sign-up-button__form'>
                        <Input
                            placeholder='email'
                            type='text'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Button type='submit' onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>

            {user ?
                (
                    <Button onClick={() => auth.signOut()}>Logout, {user.displayName}</Button>
                ) :
                (
                    <>
                        <Button onClick={() => setOpenSignUp(true)}>Sign Up!</Button> | <Button onClick={() => setOpenSignIn(true)}>Sign In!</Button>
                    </>
                )
            }
        </>
    )
}

export default Authenticate