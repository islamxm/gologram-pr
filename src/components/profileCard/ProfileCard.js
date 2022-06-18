import { useNavigate } from 'react-router-dom';
import Services from '../../services/authService';
import Button from '../button/Button';
import {
    SettingOutlined} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

import './ProfileCard.scss';



const service = new Services();

const ProfileCard = () => {

    const userData = useAuth();
    const navigate = useNavigate();

    const translateType = (item) => {
        switch (item) {
            case 'blogger':
                return 'блогер'
            case 'self_employed':
                return 'Самозанятый'
            case 'individual_entrepreneurship':
                return 'ИП'
            case 'startapp':
                return 'cтартап'
            case 'small_business':
                return 'малый бизнес'
            case 'medium_business':
                return 'средний бизнес'
            case 'large_business':
                return 'крупный бизнес'
        }
    }


    const translateStatus = (item) => {
        switch(item) {
            case 'work':
                return 'работаю'
            case 'rest':
                return 'Отдыхаю'
            case 'leave':
                return 'в отпуске'
            case 'traffic_jam':
                return 'В пробке'
            case 'driving_from_work':
                return 'Еду с работы'
            case 'creation':
                return 'занимаюсь творчеством'
        }
    }

    service.getProfileAdvanced(userData.token)
        .then(({data}) => {
            userData.setGlobalAvatar(data.avatar);
            userData.setGlobalUsername(data.username);
            userData.setGlobalFirstName(data.first_name);
            userData.setGlobalLastName(data.last_name);
            userData.setGlobalLink(data.link);
            userData.setGlobalProfileStatus(data.profile_status);
            userData.setGlobalProfileType(data.profile_type);
            userData.setGlobalDescription(data.description);
            userData.setGlobalFollowers(data.followers.length);
            userData.setGlobalFollowing(data.following.length);
        })
    

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
                            className={userData.profileStatus ? "profileCard__body_item profileCard__body_item--status active" : "profileCard__body_item profileCard__body_item--status"}>
                                {userData.profileStatus ? translateStatus(userData.profileStatus) : 'нет статуса'}
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