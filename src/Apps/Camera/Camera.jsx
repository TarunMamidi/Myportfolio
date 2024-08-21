import React, { useState, useRef } from 'react';
import { GoogleLogin } from 'react-google-login';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import { Camera as ReactCameraPro } from 'react-camera-pro';
import './Camera.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/camera.png';

const Camera = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing, setClosing] = useState(false);
    const profileRef = useRef(null);
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500); 
    };

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        setAccessToken(response.accessToken); // Store the access token
    };

    const handleLoginFailure = (response) => {
        console.log('Login Failed:', response);
    };

    const uploadToGooglePhotos = async (imageData) => {
        if (!accessToken) return;

        const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/octet-stream',
                'X-Goog-Upload-File-Name': 'photo.jpg',
                'X-Goog-Upload-Protocol': 'raw',
            },
            body: imageData,
        });

        const uploadToken = await response.text();
        console.log('Upload Token:', uploadToken);

        await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newMediaItems: [{
                    simpleMediaItem: {
                        uploadToken: uploadToken,
                    },
                }],
            }),
        });
    };

    const handlePhotoTaken = () => {
        const image = cameraRef.current.takePhoto();
        setImage(image);
        uploadToGooglePhotos(image); // Upload to Google Photos
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`camera-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbara'>
                    <div className='adjtopa'>
                        <h2 className='app-titleca'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titleca'>Camera</h2>
                    </div>
                    <p className='close-buttonca' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contentca'>
                    <GoogleLogin
                        clientId="1035767576447-g7k0vg5tpnt0ggt89jcofki196cj6djl.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        scope="https://www.googleapis.com/auth/photoslibrary.appendonly"
                    />
                    <ReactCameraPro ref={cameraRef} aspectRatio={16/9} />
                    <button onClick={handlePhotoTaken}>📷</button>
                    {image && <img src={image} alt='Taken' />}
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default Camera;
