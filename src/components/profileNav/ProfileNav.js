import './ProfileNav.scss';

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { 
    MessageFilled ,
    PlusCircleFilled,
    GlobalOutlined,
    HeartFilled,
    HomeFilled,
    } from '@ant-design/icons';

import ProfileDropdownMenu from "../profileDropdownMenu/ProfileDropdownMenu";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";


import {Modal} from 'antd';
import AddPost from '../addPost/addPost';
import AddPostTest from '../addPost/addPostTest';




const service = new authService();

const ProfileNav = () => {
    const {token, avatar, setGlobalAvatar} = useAuth();
    const [isModalVis, setModalVis] = useState(false);

    useEffect(() => {
        service.getProfileAdvanced(token).then(({data}) => {
            setGlobalAvatar(data.avatar);
        })
    }, [])
  
    const showModal = () => {
        setModalVis(true);
    }

    const closeModal = () => {
        setModalVis(false);
    }

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
                    {/* <NavLink onClick={showModal} to='/add-story' end style={({isActive}) => ({color: isActive ? '#000' : '#aaa'})}>
                        
                    </NavLink> */}
                    <PlusCircleFilled onClick={showModal} className="profileNav__item_icon" style={{fontSize: '30px', color: '#aaa'}}/>
                    <AddPost isVis={isModalVis} onCancel={closeModal}/>
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