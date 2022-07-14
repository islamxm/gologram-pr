import './ProfileHeader.scss';
import {Link} from 'react-router-dom';
import { Row, Col } from 'antd';
import { useRef } from 'react';
import Search from '../search/Search';
import ProfileNav from '../profileNav/ProfileNav';
import logoMain from '../../img/logo-main.svg';



const ProfileHeader = () => {
    

    return (
        <div className="profileHeader">
                <div className="container">
                    <Row align="middle">
                        <Col span={4}>
                            <Link to={'/'}>
                            <div className="profile__item profile__logo">
                                <img src={logoMain} alt="" />
                            </div>
                            </Link>
                            
                        </Col>
                        
                        <Col span={12} style={{ display: 'flex', alignItems: 'center',}}>
                            <div className="profile__item profile__search">
                                <Search/>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="profile__item profile__action">
                                <ProfileNav/>
                            </div>
                        </Col>
                    </Row>
                    
                </div>
            </div>
    )
}

export default ProfileHeader;