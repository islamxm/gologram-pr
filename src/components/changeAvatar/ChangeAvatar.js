import './ChangeAvatar.scss';
import {PictureOutlined} from '@ant-design/icons';
import { Formik, Form, Field } from 'formik';
import  { Upload, Button } from 'antd';

import authService from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';


const service = new authService();

const ChangeAvatar = () => {
    const userData = useAuth()
    const [currentAvatar, setCurrentAvatar] = useState(userData.avatar ? userData.avatar : null);
    
    return (
        <div className="changeAvatar">
            <div className="changeAvatar__main">
                <input 
                    type="file" 
                    accept='image/*' 
                    id='avatar' 
                    onChange={(e) => {
                        let data = new FormData();
                        data.append('avatar', e.target.files[0]);
                        service.changeAvatar(userData.token, data)
                        .then(res => {
                            if(res.response.code === 200 && res.response.status === 'successfully') {
                                userData.setGlobalAvatar(res.input_data.avatar);
                            } else {
                                alert('Ошибка при смене аватарки, проверяй свой ГОВНОКОД!')
                            }
                        })
                    }}/>
                <label htmlFor='avatar' className="changeAvatar__main_img">
                    <img src={userData.avatar} alt="" />
                    <div className="changeAvatar__main_img_mask">
                        <div className="changeAvatar__main_img_mask_text">Загрузить картинку</div>
                        <div className="changeAvatar__main_img_mask_icon">
                            <PictureOutlined/>
                        </div>
                        
                    </div>
                </label>
                
            </div>
            <div className="changeAvatar__ex">
                **загрузите свою фотографию размером 1080 на 1080 не больше 1 мб
            </div>
        </div>
    )
}

export default ChangeAvatar;