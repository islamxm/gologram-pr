import { NavLink } from "react-router-dom";
import { Dropdown } from "antd";
import ProfileDropdownMenu from "../profileDropdownMenu/ProfileDropdownMenu";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import authService from "../../services/authService";
import { 
    MessageFilled ,
    PlusCircleFilled,
    GlobalOutlined,
    HeartFilled,
    HomeFilled,
    } from '@ant-design/icons';
import './ProfileNav.scss';




const service = new authService();

const ProfileNav = () => {
    const {token} = useAuth();
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        service.getProfileAdvanced(token).then(({data}) => {
            setAvatar(data.avatar);
        })
    }, [])

    return (
        <div className="profileNav">
            <div className="profileNav__list">
                <div className="profileNav__item">
                    <NavLink to='/home' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        <HomeFilled className="profileNav__item_icon" style={{fontSize: '30px'}}/>
                    </NavLink>
                </div>
                <div className="profileNav__item">
                    <NavLink to='/direct' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        <MessageFilled className="profileNav__item_icon" style={{fontSize: '30px'}}/>
                    </NavLink>
                </div>
                <div className="profileNav__item">
                    <NavLink to='/add-story' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        <PlusCircleFilled className="profileNav__item_icon" style={{fontSize: '30px'}}/>
                    </NavLink>
                </div>
                <div className="profileNav__item">
                    <NavLink to='/navigator' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        <GlobalOutlined className="profileNav__item_icon" style={{fontSize: '30px'}}/>
                    </NavLink>
                </div>
                <div className="profileNav__item">
                    <NavLink to='/actions' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        <HeartFilled className="profileNav__item_icon" style={{fontSize: '30px'}}/>
                    </NavLink>
                </div>
                <div className="profileNav__item profileNav__item--avatar">
                    <Dropdown
                        overlay={<ProfileDropdownMenu/>}>
                            <NavLink to='/' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                                <div className="profileNav__item_img">
                                    <img src={avatar} alt="" />
                                </div>
                            </NavLink>
                    </Dropdown>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileNav;