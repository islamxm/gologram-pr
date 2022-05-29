import { Row, Col } from 'antd';
import Search from '../../search/Search';
import ProfileNav from '../../profileNav/ProfileNav';
import ProfileCard from '../../profileCard/ProfileCard';
import ProfilePosts from '../../profilePosts/profilePosts';

import logoMain from '../../../img/logo-main.svg';

import './ProfileSelf.scss';

const ProfileSelf = () => {
    return (
        
        // Header
        <div className="profile">
            {/* Header */}
            <div className="profileHeader">
                <div className="container">
                    <Row align="middle">
                        <Col span={4}>
                            <div className="profile__item profile__logo">
                                <img src={logoMain} alt="" />
                            </div>
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


            {/* Profile card */}
            <ProfileCard/>

            

            {/* Profile posts */}
            <ProfilePosts/>
        </div>

        // Profile card
    )
}

export default ProfileSelf; 