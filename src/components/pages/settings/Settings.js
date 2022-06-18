import React, { useState } from 'react';
import { Tabs } from 'antd';


import ProfileHeader from '../../profileHeader/ProfileHeader';
import EditProfile from '../../editProfile/EditProfile';
import ChangePass from '../../changePass/ChangePass';
import ChangeAvatar from '../../changeAvatar/ChangeAvatar';
import './Settings.scss';

const { TabPane } = Tabs;

const Settings = () => {
    return (
        <>
            <ProfileHeader/>
            <div className="settings">
                <div className="container">
                    <div className="settings__in panel">
                        <div className="settings__body">
                            <Tabs
                                defaultActiveKey='1'
                                tabPosition='left'
                                >
                                <TabPane  tab={'Редактировать профиль'} key={1}>
                                    <EditProfile/>
                                </TabPane> 
                                <TabPane  tab={'Сменить пароль'} key={2}>
                                    <ChangePass/>
                                </TabPane> 
                                <TabPane  tab={'Сменить аватар'} key={3}>
                                    <ChangeAvatar/>
                                </TabPane> 
                                <TabPane  tab={'Эл. почта и SMS'} key={4}>
                                    <h2>Эл. почта и SMS</h2>
                                </TabPane> 
                                <TabPane  tab={'Push-уведомления'} key={5}>
                                    <h2>Push-уведомления</h2>
                                </TabPane> 
                                <TabPane  tab={'Управление контактами'} key={6}>
                                    <h2>Управление контактами</h2>
                                </TabPane> 
                                <TabPane  tab={'Конфиденциальность и уведомления'} key={7}>
                                    <h2>Конфиденциальность и уведомления</h2>
                                </TabPane> 
                                <TabPane  tab={'Входы в аккаунт'} key={8}>
                                    <h2>Входы в аккаунт</h2>
                                </TabPane> 
                                <TabPane  tab={'Электронные письмо от Galogram'} key={9}>
                                    <h2>Электронные письмо от Galogram</h2>
                                </TabPane> 
                                <TabPane  tab={'Помощь'} key={10}>
                                    <h2>Помощь</h2>
                                </TabPane> 
                                <TabPane  tab={'Переключиться на профессиональный аккаунт'} key={11}>
                                    <h2>Переключиться на профессиональный аккаунт</h2>
                                </TabPane> 
                            </Tabs>
                        </div>
                        {/* <div className="settings__main">

                        </div> */}
                    </div>
                </div>
            </div>
        </>
        
    )
} 

export default Settings;