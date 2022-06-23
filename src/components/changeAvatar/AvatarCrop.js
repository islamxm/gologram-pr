import './AvatarCrop.scss';

import Cropper from 'react-easy-crop';
import { getCroppedImg } from './canvasUtils';
import { useCallback, useState } from 'react';
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const service = new authService();

const AvatarCrop = ({classes}) => {
    
    const userData = useAuth();
    
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [mainImg, setMainImg] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
          )
          setCroppedImage(croppedImage)


          urltoFile(imageSrc, 'meme.png', 'image/png').then(function(file){
            const data = new FormData();
            data.append('avatar', file);
            service.changeAvatar(userData.token, data).then(res => console.log(res))
          })


          
          
          
        } catch (e) {
          console.error(e)
        }
    }, [imageSrc, croppedAreaPixels])

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file)
          setImageSrc(imageDataUrl)
        }
    }

    function readFile(file) {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result), false)
          reader.readAsDataURL(file)
        })
    }

    function urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }


    return (
        <div className="AvatarCrop">
            {imageSrc ? (
                <>
                <div className="crop-container">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={3/3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
                
                </div>
                <button onClick={showCroppedImage} style={{zIndex: 10000, backgroundColor: 'white', color: 'black', position: 'absolute', top: 0, left: 0}}>Send</button>
                </>
            ) : (
                <input type="file" onChange={onFileChange} accept="image/*" />
            )}
            
            
        </div>
    )

    
}

export default AvatarCrop;