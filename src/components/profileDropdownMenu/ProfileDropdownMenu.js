import { NavLink, useNavigate } from 'react-router-dom';
import './ProfileDropdownMenu.scss';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/authService';
import {
    UserOutlined,
    PushpinOutlined,
    ExportOutlined } from '@ant-design/icons';


const service = new authService();

const ProfileDropdownMenu = () => {

    const navigate = useNavigate();

    const userData = useAuth();
    
    const logoutHandler = (e) => {
        e.preventDefault();
        service.logOut(userData.token).then((res) => {
            userData.removeGlobalToken(userData.token);
            navigate('/', {replace: true})
        })
    }


    return (
        <div className="profileDropdownMenu">
            <div className="profileDropdownMenu__item">
                <NavLink 
                    to={'/'} 
                    className="profileDropdownMenu__item_link">

                    <div className="profileDropdownMenu__item_link_icon">
                        <UserOutlined/>
                    </div>
                    <div className="profileDropdownMenu__item_link_text">Профиль</div>
                </NavLink>
            </div>
            <div className="profileDropdownMenu__item">
                <NavLink 
                    to={'/'}
                    className="profileDropdownMenu__item_link">

                    <div className="profileDropdownMenu__item_link_icon">
                        <PushpinOutlined/>
                    </div>
                    <div className="profileDropdownMenu__item_link_text">Сохраненное</div>

                </NavLink>
            </div>
            <div className="profileDropdownMenu__item profileDropdownMenu__item-logout">
                <div onClick={(e) => logoutHandler(e)} className="profileDropdownMenu__item_link">
                    <div className="profileDropdownMenu__item_link_icon">
                        <ExportOutlined/>
                    </div>
                    <div className="profileDropdownMenu__item_link_text">Выйти</div>
                </div>
            </div>
            <div className="profileDropdownMenu_item"></div>
            <div className="profileDropdownMenu_item"></div>
        </div>
    )
}

export default ProfileDropdownMenu;