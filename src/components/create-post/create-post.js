import { Button } from '@material-ui/core'
import Firebase from 'firebase'
import React, { useState } from 'react'
import { storage, db, auth } from '../../utils/firebase';
import './create-post.css'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

    const selectFile = event => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const uploadFile = () => {
        if (image === null) {
            alert('your upload must include an image!')
            return
        }

        // Asynchronous task that uploads our image to firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        // Listens to the async task and provides us a snapshot of how many bytes have been uploaded over time
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            () => {
                storage.ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(
                        url => {
                            db.collection('posts').add({
                                timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                author: auth.currentUser.displayName
                            })

                            setProgress(0)
                            setCaption('')
                            setImage(null)
                        })
            }
        )
    }

    return (
        <div className='createpost'>
            <h3>Upload a photo and caption!</h3>

            <progress value={progress} max='100' />
            <input
                type='file'
                onChange={selectFile} />

            <input
                type='text'
                value={caption}
                placeholder='enter a caption'
                onChange={event => setCaption(event.target.value)} />

            <Button className='createpost__button' onClick={uploadFile}>Create Post</Button>
        </div>
    )
}

export default CreatePost