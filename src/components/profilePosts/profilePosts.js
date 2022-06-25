import './profilePosts.scss';
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import {
    AppstoreOutlined,
    CameraOutlined,
    VideoCameraOutlined,
    CaretRightOutlined,
    DownloadOutlined,
    UserOutlined 
  } from '@ant-design/icons';

import authService from '../../services/authService';



const { TabPane } = Tabs;
const service = new authService();

const EmptyPost = () => {

    return (
        <div className="emptyPost">
            <div className="emptyPost__wrapper">
                <CameraOutlined/>
                <div className="emptyPost__text">Нет публикаций</div>
            </div>
        </div>
    )
}


const ProfilePosts = () => {

    return (
        <div className="profilePosts">
            <div className="container">
                <div className="profilePosts__in">
                    <div className="profilePosts__tabs">
                        <Tabs tabPosition='top'>
                            <TabPane tab={
                                <div className='profilePosts__tabs_item'>
                                    <div className="profilePosts__tabs_item_icon"><AppstoreOutlined/></div>
                                    <div className="profilePosts__tabs_item_text">Публикации</div>
                                </div>
                                
                                } key={1}>
                                <EmptyPost/>
                            </TabPane>
                            <TabPane tab={
                                <div className='profilePosts__tabs_item'>
                                    <div className="profilePosts__tabs_item_icon"><VideoCameraOutlined/></div>
                                    <div className="profilePosts__tabs_item_text">REELS</div>
                                </div>

                                } key={2}>
                                <EmptyPost/>
                            </TabPane>
                            <TabPane tab={
                                <div className='profilePosts__tabs_item'>
                                    <div className="profilePosts__tabs_item_icon"><CaretRightOutlined/></div>
                                    <div className="profilePosts__tabs_item_text">ВИДЕО</div>
                                </div>
                                } key={3}>
                                <EmptyPost/>
                            </TabPane>
                            <TabPane tab={
                                <div className='profilePosts__tabs_item'>
                                    <div className="profilePosts__tabs_item_icon"><DownloadOutlined/></div>
                                    <div className="profilePosts__tabs_item_text">СОХРАНЕННОЕ</div>
                                </div>
                                } key={4}>
                                <EmptyPost/>
                            </TabPane>
                            <TabPane tab={
                                <div className='profilePosts__tabs_item'>
                                    <div className="profilePosts__tabs_item_icon"><UserOutlined/></div>
                                    <div className="profilePosts__tabs_item_text">ОТМЕТКИ</div>
                                </div>
                                } key={5}>
                                <EmptyPost/>
                            </TabPane>
                        </Tabs>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilePosts;