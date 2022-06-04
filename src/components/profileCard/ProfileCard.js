import { useState } from 'react';
import Cookies from 'js-cookie';
import Services from '../../services/authService';
import Button from '../button/Button';
import {
    SettingOutlined} from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';


import './ProfileCard.scss';
import avatar from '../../img/avatar.png';



const service = new Services();

const ProfileCard = () => {

    const {token} = useAuth();

    // const [avatar, setAvatar] = useState(null);
    const [description, setDescription] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [link, setLink] = useState(null);
    const [status, setStatus] = useState(null);
    const [prof, setProf] = useState(null);
    const [follows, setFollows] = useState(null);
    const [followers, setFollowers] = useState(null);


    service.getProfileAdvanced(token)
        .then(res => {
            setFirstName(res.first_name);
            setLink(res.link);
            setStatus(res.profile_status);
            setProf(res.profile_type);
        })
    service.getUserFollowers(token)
            .then(res => {
                setFollowers(res.followers.length);
            })
    service.getUserFollows(token)
            .then(res => {
                setFollows(res.following.length)
            })

    return (
        <div className="profileCard">
            <div className="container">
                <div className="profileCard__in">
                    <div className="profileCard__item profileCard__img">
                        <div className="profileCard__img_el">
                            <img src={avatar} alt="" />
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__body">
                        <div 
                            className="profileCard__body_item profileCard__body_item--nickname">nickname</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--name">{firstName}</div>
                        <div 
                            className="profileCard__body_item profileCard__body_item--prof">{prof}</div>
                        <div 
                            className={status ? "profileCard__body_item profileCard__body_item--status active" : "profileCard__body_item profileCard__body_item--status"}>{status ? status : 'нет статуса'}</div>
                        <a 
                            href={link} 
                            className="profileCard__body_item profileCard__body_item--link">{link ? link : 'нет ссылки'}</a>
                    </div>
                    <div className="profileCard__item profileCard__action">
                        <div className="profileCard__action_item">
                            <div className="">
                                <Button classList=' button__border' buttonText='Редактировать профиль'/>
                            </div>
                        </div>
                        <div className="profileCard__action_item">
                            <div className="profileCard__action_item_btn">
                                <Button classList='' icon={<SettingOutlined/>}/>
                            </div>
                        </div>
                    </div>
                    <div className="profileCard__item profileCard__info">
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">0</div>
                            <div className="profileCard__info_item_name">публикации</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{followers}</div>
                            <div className="profileCard__info_item_name">подписчиков</div>
                        </div>
                        <div className="profileCard__info_item">
                            <div className="profileCard__info_item_value">{follows}</div>
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