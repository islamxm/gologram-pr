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
import useModal from '../../hooks/useModal';
import translateType from '../../funcs/translateType';
import translateStatus from '../../funcs/translateStatus';
import useUserData from '../../hooks/useUserData';

const service = new Services();


const ProfileCard = () => {
    const allUserData = useUserData();
    const userData = useAuth();
    const navigate = useNavigate();
    const {visible, hideModal, showModal} = useModal();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    

    useEffect(() => {
            userData.setGlobalReqLoad(true);
            service.getProfileAdvanced(userData.token)
            .then((res) => {
                if(res.response.code === 200) {
                    allUserData.setAvatar(res.data.avatar)
                    allUserData.setUsername(res.data.username)
                    allUserData.setFirstName(res.data.first_name)
                    allUserData.setLastName(res.data.last_name)
                    allUserData.setLink(res.data.link)
                    allUserData.setProfStatus(res.data.profile_status)
                    allUserData.setProfType(res.data.profile_type)
                    allUserData.setDescription(res.data.description)
                    allUserData.setFollowers(res.data.followers.length > 0 ? res.data.followers.join() : 0)
                    allUserData.setFollowings(res.data.followings.length > 0 ? res.data.followings.join() : 0)
                    allUserData.setPosts(res.data.publications_count)
                } else {
                    messages.error('Не удалось получить данные')
                }
                userData.setGlobalReqLoad(false);
                
            }).catch(err => {
                console.log(err);
                messages.error('Не удалось получить данные')
            })
            
        
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
          urltoFile(croppedImage, 'avatar.png', 'image/png').then(function(file){
            const data = new FormData();
            data.append('avatar', file);
            service.changeAvatar(userData.token, data).then(res => {
                userData.setGlobalReqLoad(true);
                if(res.response.code === 200) {
                    allUserData.setAvatar(res.input_data.avatar);
                    userData.setGlobalAvatar(res.input_data.avatar);
                    userData.setGlobalReqLoad(false);
                    messages.success('Аватар успешно изменен');
                } else {
                    console.log(res.response.code);
                    userData.setGlobalReqLoad(false);
                    messages.error('Не удалось изменить аватар');
                }
            }).catch(err => {
                console.log(err)
            })
          })
        } catch(err) {
            console.log(err);
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
        showModal();
    }
    const onClose = useCallback(() => {
        setImageSrc(null);
        hideModal();
    }, [])

    return (
        <div className="profileCard">
            <div className="container">
                <div className="profileCard__in">
                    <Modal className='AvatarCrop' title='Сменить аватарку' visible={visible} onCancel={onClose}>
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
                                <img src={allUserData.avatar} alt="" />
                            </div>
                        </Dropdown>
                        
                    </div>
                    <div className="profileCard__item profileCard__body">
                        <div className="profileCard__body_item profileCard__body_item--username">
                            {allUserData.username}
                        </div>
                        <div className="profileCard__body_item profileCard__body_item--name">
                            {allUserData.firstName} {allUserData.lastName}
                        </div>
                        <div className="profileCard__body_item profileCard__body_item--prof">
                            {translateType(allUserData.profType)}
                        </div>
                        <div className={allUserData.profStatus ? "profileCard__body_item profileCard__body_item--status active" : "profileCard__body_item profileCard__body_item--status"}>
                            {allUserData.profStatus ? translateStatus(allUserData.profStatus) : 'нет статуса'}
                        </div>
                        <a 
                            href={allUserData.link} target="_blank" rel='noreferrer'
                            className="profileCard__body_item profileCard__body_item--link">{allUserData.link ? allUserData.link : 'нет ссылки'}</a>
                        <div className="profileCard__body_item profileCard__body_item--descr">
                            {allUserData.description ? allUserData.description : null}
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__action">
                        <div className="profileCard__action_item">
                            <div className="">
                                <Button 
                                    onClickHandle={() => navigate('/settings')} 
                                    classList=' button__border' 
                                    buttonText='Редактировать профиль'/>
                            </div>
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__info">
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{allUserData.posts}</div>
                            <div className="profileCard__info_item_name">публикации</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{allUserData.followers}</div>
                            <div className="profileCard__info_item_name">подписчиков</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{allUserData.followings}</div>
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