import '../changeAvatar/AvatarCrop.scss';
import './ProfileCard.scss';

import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown, Modal } from 'antd';
import {
    SettingOutlined, PictureOutlined, CameraOutlined} from '@ant-design/icons';

import Services from '../../services/authService';
import Button from '../button/Button';
import {getCroppedImg} from '../changeAvatar/canvasUtils';
import messages from '../messages/messages';
import useAuth from '../../hooks/useAuth';





const service = new Services();



const ProfileCard = () => {

    const userData = useAuth();
    const {token, setGlobalReqLoad, setGlobalAvatar, avatar} = useAuth()
    const navigate = useNavigate();


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);


    

    const translateType = (item) => {
        switch (item) {
            case 'simple_user':
                return 'Пользователь'
            case 'blogger':
                return 'Блогер'
            case 'self_employed':
                return 'Самозанятый'
            case 'individual_entrepreneurship':
                return 'ИП'
            case 'startapp':
                return 'Стартап'
            case 'small_business':
                return 'Малый бизнес'
            case 'medium_business':
                return 'Средний бизнес'
            case 'large_business':
                return 'Крупный бизнес'
        }
    }


    const translateStatus = (item) => {
        switch(item) {
            case 'work':
                return 'работаю'
            case 'rest':
                return 'отдыхаю'
            case 'leave':
                return 'в отпуске'
            case 'traffic_jam':
                return 'в пробке'
            case 'driving_from_work':
                return 'еду с работы'
            case 'creation':
                return 'занимаюсь творчеством'
        }
    }

    useEffect(() => {
            setGlobalReqLoad(true);
            service.getProfileAdvanced(userData.token)
            .then((res) => {
                if(!res) {
                    
                } else {
                    
                    userData.setGlobalAvatar(res.data.avatar);
                    userData.setGlobalUsername(res.data.username);
                    userData.setGlobalFirstName(res.data.first_name);
                    userData.setGlobalLastName(res.data.last_name);
                    userData.setGlobalLink(res.data.link);
                    userData.setGlobalProfileStatus(res.data.profile_status);
                    userData.setGlobalProfileType(res.data.profile_type);
                    userData.setGlobalDescription(res.data.description);
                    userData.setGlobalFollowers(res.data.followers.length);
                    userData.setGlobalFollowing(res.data.followings.length);
                }
                setGlobalReqLoad(false);
                
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
            service.changeAvatar(token, data).then(res => {
                setGlobalReqLoad(true);
                if(res && res.response.code === 200 && res.response.status === 'successfully') {
                    setGlobalAvatar(res.input_data.avatar);
                    setGlobalReqLoad(false);
                    messages.success();
                } else {
                    console.log(res.response.code);
                    setGlobalReqLoad(false);
                    messages.error();
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
        <div className="profileCard">
            <div className="container">
                <div className="profileCard__in">
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
                    <div className="profileCard__item profileCard__img">
                        <Dropdown overlay={
                            <ul className='profileCard__img_menu'>
                                <li className='profileCard__img_menu_item' onClick={modalOpen}>Изменить фото</li>
                                <li className='profileCard__img_menu_item delete disabled'>Удалить</li>
                            </ul>
                        }>
                            <div className="profileCard__img_el">
                                <img src={userData.avatar} alt="" />
                            </div>
                        </Dropdown>
                        
                    </div>
                    <div className="profileCard__item profileCard__body">
                        <div 
                            className="profileCard__body_item profileCard__body_item--username">{userData.username}</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--name">{userData.firstName} {userData.lastName}</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--prof">{translateType(userData.profileType)}</div>
                        <div 
                            className={userData.profileStatus ? "profileCard__body_item profileCard__body_item--status active" : "profileCard__body_item profileCard__body_item--status"}>
                                {userData.profileStatus ? translateStatus(userData.profileStatus) : 'нет статуса'}
                                {/* <Modal className='profileCard__body_item--status_modal' title='Изменить статус' visible={modalVis} onOk={handleOk} onCancel={handleCancel}>
                                    <h2>Пункты статуса</h2>
                                </Modal> */}
                            </div>
                        <a 
                            href={userData.link} target="_blank" rel='noreferrer'
                            className="profileCard__body_item profileCard__body_item--link">{userData.link ? userData.link : 'нет ссылки'}</a>
                        <div className="profileCard__body_item profileCard__body_item--descr">
                            {userData.description ? userData.description : null}
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__action">
                        <div className="profileCard__action_item">
                            <div className="">
                                <Button onClickHandle={() => navigate('/settings')} classList=' button__border' buttonText='Редактировать профиль'/>
                            </div>
                        </div>
                        <div className="profileCard__action_item">
                            <div className="profileCard__action_item_btn">
                                <Button onClickHandle={() => navigate('/settings')} classList='' icon={<SettingOutlined/>}/>
                            </div>
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__info">
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">0</div>
                            <div className="profileCard__info_item_name">публикации</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{userData.followers}</div>
                            <div className="profileCard__info_item_name">подписчиков</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{userData.following}</div>
                            <div className="profileCard__info_item_name">подписки</div>
                        </div>
                    </div>

                    <div className="profileCard__item profileCard__stories">
                        <div className="profileCard__stories_wr">
                            <div className="profileCard__stories_item">
                                тут должны быть сторисы
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;