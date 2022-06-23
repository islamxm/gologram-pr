import './ChangeAvatar.scss';
import { useState } from 'react';

import { Modal } from 'antd';
import {PictureOutlined} from '@ant-design/icons';
import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
// import AvatarCrop from './AvatarCrop';



const service = new authService();









const ChangeAvatar = () => {
    const {token, setGlobalReqLoad} = useAuth();
    const [avatar, setAvatar] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const modalOpen = () => {
        setIsModalVisible(true);
    }

    const modalClose = () => {
        setIsModalVisible(false);
    }


    useEffect(() => {
        setGlobalReqLoad(true);
        service.getProfileAdvanced(token)
        .then(({data}) => {
            setAvatar(data.avatar);
            setGlobalReqLoad(false)
        })
    }, [])
    
    return (
        <div className="changeAvatar">
            {/* <Modal className='AvatarCrop' title='Сменить аватарку' visible={isModalVisible} onCancel={modalClose}>
                
            </Modal> */}
            <div className="changeAvatar__main">
                {/* <input 
                    type="file" 
                    accept='image/*' 
                    id='avatar' 
                    onChange={(e) => {
                        let data = new FormData();
                        data.append('avatar', e.target.files[0]);
                        console.log(e.target.files[0])
                        console.log(data);
                        service.changeAvatar(userData.token, data)
                        .then(res => {
                            console.log(res);
                            if(res.response.code === 200 && res.response.status === 'successfully') {
                                userData.setGlobalAvatar(res.input_data.avatar);
                            } else {
                                alert('Ошибка при смене аватарки, проверяй свой ГОВНОКОД!');
                            }
                        })
                    }}/> */}
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
                **загрузите свою фотографию размером 1080 на 1080 не больше 1 мб
            </div>
        </div>
    )
}

export default ChangeAvatar;