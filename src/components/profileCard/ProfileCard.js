import { useNavigate } from 'react-router-dom';
import Services from '../../services/authService';
import Button from '../button/Button';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import {
    SettingOutlined} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

import './ProfileCard.scss';



const service = new Services();


const ProfileCard = () => {

    const userData = useAuth();
    const {setGlobalReqLoad} = useAuth()
    const navigate = useNavigate();
    const [modalVis, setModalVis] = useState(false);

    

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
                    console.log(res);
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

    const showModal = () => {
        setModalVis(true);
    }

    const handleOk = () => {
        setModalVis(false);   
    }

    const handleCancel = () => {
        setModalVis(false);
    }
    
    

    return (
        <div className="profileCard">
            <div className="container">
                <div className="profileCard__in">
                    <div className="profileCard__item profileCard__img">
                        <div className="profileCard__img_el">
                            <img src={userData.avatar} alt="" />
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__body">
                        <div 
                            className="profileCard__body_item profileCard__body_item--username">{userData.username}</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--name">{userData.firstName} {userData.lastName}</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--prof">{translateType(userData.profileType)}</div>
                        <div 
                            onClick={showModal}
                            className={userData.profileStatus ? "profileCard__body_item profileCard__body_item--status active" : "profileCard__body_item profileCard__body_item--status"}>
                                {userData.profileStatus ? translateStatus(userData.profileStatus) : 'нет статуса'}
                                {/* <Modal className='profileCard__body_item--status_modal' title='Изменить статус' visible={modalVis} onOk={handleOk} onCancel={handleCancel}>
                                    <h2>Пункты статуса</h2>
                                </Modal> */}
                            </div>
                        <a 
                            href={userData.link} 
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
                            <div className="profileCard__info_item_value">{userData.posts}</div>
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