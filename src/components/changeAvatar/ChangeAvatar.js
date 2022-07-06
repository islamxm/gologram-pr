import './ChangeAvatar.scss';
import './AvatarCrop.scss';

import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Modal } from 'antd';
import {PictureOutlined, CameraOutlined} from '@ant-design/icons';

import { getCroppedImg } from './canvasUtils';
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import messages from '../messages/messages';


const service = new authService();

const ChangeAvatar = () => {
    const {token, setGlobalReqLoad, setGlobalAvatar, avatar} = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);


    useEffect(() => {
        setGlobalReqLoad(true);
        service.getProfileAdvanced(token)
        .then(({data}) => {
            setGlobalAvatar(data.avatar);
            setGlobalReqLoad(false)            
        })
    }, [])

    
    const onClose = useCallback(() => {
        setImageSrc(null);
        setIsModalVisible(false); 
    }, [])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])



    const showCroppedImage = useCallback(async () => {
        onClose();
        try {
          const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
          )
          setCroppedImage(croppedImage)
          
          urltoFile(croppedImage, 'meme.png', 'image/png').then(function(file){
            const data = new FormData();
            data.append('avatar', file);
            console.log(data);
            console.log(file)
            service.changeAvatar(token, data).then(res => {
                setGlobalReqLoad(true);
                if(res && res.response.code === 200 && res.response.status === 'successfully') {
                    setGlobalAvatar(res.input_data.avatar);
                    setGlobalReqLoad(false);
                    messages.success('Аватар успешно изменен');
                } else {
                    console.log(res.response.code);
                    setGlobalReqLoad(false);
                    messages.error('Произошла ошибка');
                }
                
            })
          })
        } catch (e) {
          console.error(e)
        }
    }, [imageSrc, croppedAreaPixels])

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file)
          setImageSrc(imageDataUrl)
          modalOpen();
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

    const modalOpen = (e) => {
        setIsModalVisible(true);
    }
    
    return (
        <div className="changeAvatar">
            <Modal className='AvatarCrop' title='Сменить аватарку' visible={isModalVisible} onCancel={onClose}>
                {imageSrc ? (
                    <>
                        <div className="crop-container">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={3/3}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        
                        </div>
                        <button className='AvatarCrop__save button button__orange' onClick={showCroppedImage}><div className="button__text">
                        Сохранить</div></button>
                    </>
                ) : (
                    <div className="AvatarCrop__action">
                        <div className="AvatarCrop__action_btn">
                            <input id='avatar' type="file" onChange={onFileChange} accept="image/*"/>
                            <label htmlFor="avatar" className="AvatarCrop__action_btn_label">
                                <div className="AvatarCrop__action_btn_label_icon">
                                    <PictureOutlined/>
                                </div>
                                <div className="AvatarCrop__action_btn_label_text">Загрузить с устройства</div>
                            </label>
                        </div>
                        <div className="AvatarCrop__action_btn disabled">
                            <div className="AvatarCrop__action_btn_label">
                                <div className="AvatarCrop__action_btn_label_icon">
                                    <CameraOutlined />
                                </div>
                                <div className="AvatarCrop__action_btn_label_text">Сфотографировать</div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
            <div className="changeAvatar__main">
                <div className="changeAvatar__main_img" onClick={modalOpen}>
                    <img src={avatar} alt="" />
                    <div className="changeAvatar__main_img_mask">
                        <div className="changeAvatar__main_img_mask_text">Загрузить картинку</div>
                        <div className="changeAvatar__main_img_mask_icon">
                            <PictureOutlined/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="changeAvatar__ex">
                **загрузите свою фотографию любого размера и любого формата
            </div>
        </div>
    )
}

export default ChangeAvatar;