//GLOBAL PACKAGES
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Formik, Form, Field} from 'formik';
import AuthInput from '../authInput/AuthInput';
import { Select } from 'antd';

import SexSelect from '../sexSelect/SexSelect';


import {
    Tooltip,
} from 'react-tippy';
//LOCAL COMPONENTS
import authService from '../../services/authService';
import Button from '../button/Button';
// import AuthInvite from '../authInvite/AuthInvite';
//IMAGES
import logoMain from '../../img/logo-main.svg';
import googlePlay from '../../img/google-play-badge.png';
import appleBadge from '../../img/apple-badge.svg';

//STYLES
import './Authform.scss';
import 'react-tippy/dist/tippy.css';

const service = new authService();
const { Option } = Select;



const SigninForm = () => {

    let nav = useNavigate();
    
    const [emailText, setEmailText] = useState(null);
    const [usernameText, setUsernameText ] = useState(null);
    const [firstnameText, setFirstnameText] = useState(null);
    const [lastnameText, setLastnameText] = useState(null);
    const [passwordText, setPasswordText] = useState(null);
    const [sexText, setSexText] = useState(null);

    return (
        <div className="authform">
            <div className="authform__inner">
                <div className="authform__item">
                    <div className="authform__item_in authform__main authform__panel">
                        <div className="authform__main_top">
                            <div className="authform__main_top_logo">
                                <img src={logoMain} alt="" />
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                email: '',
                                username: '',
                                first_name: '',
                                last_name: '',
                                password: '',
                                sex: ''
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log(values);
                                service.signIn(values).then(res => {
                                    console.log(res);
                                    
                                    setEmailText(res.data.validate_errors?.email ? res.data.validate_errors.email : null);
                                    setUsernameText(res.data.validate_errors?.username ? res.data.validate_errors.username : null);
                                    setFirstnameText(res.data.validate_errors?.first_name ? res.data.validate_errors.first_name : null);
                                    setLastnameText(res.data.validate_errors?.last_name ? res.data.validate_errors.last_name : null);
                                    setPasswordText(res.data.validate_errors?.password ? res.data.validate_errors.password : null);
                                    setSexText(res.data.validate_errors?.sex ? res.data.validate_errors.sex : null);
                                    if(res.response.code === 201) {
                                        nav('/login', {replace: true});
                                    }

                                    if(res.response.code !== 201) {
                                        console.log(res.response.status);
                                    }

                                    setSubmitting(false);
                                })
                            }}>

                            {({isSubmitting}) => (
                                <Form className="authform__main_body">
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='ваш e-mail'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='email' placeholder="введите e-mail"/>
                                        </Tooltip>
                                        <div className="authform__main_item_ex">
                                            {emailText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='минимум 3 символов, латинские бувы и цифры'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='username' placeholder="введите никнейм"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {usernameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='ваше имя'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='first_name' placeholder="введите имя"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {firstnameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='ваше фамилия'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='last_name' placeholder="введите фамилию"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {lastnameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='пароль должен содержать минимум 8 символов, прописные и строчные буквы на латинице, спец. символы и цифры'
                                            position='top'
                                            trigger='mouseenter'
                                            >
                                            <AuthInput type="password" name='password' placeholder="введите пароль"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {passwordText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        {/* <div className="authform__main_item_name">Ваш пол</div> */}
                                        <div className="authform__main_item_select">
                                            <SexSelect/>
                                        </div>
                                        

                                        <div className="authform__main_item_ex">
                                            {sexText}
                                        </div>
                                    </div>
                                    
                                    <div className="authform__action">
                                        <Button type='submit' disabled={isSubmitting} buttonText='Регистрация' classList={'button__orange'}/>
                                        
                                    </div>
                                </Form>
                            )}

                            

                        </Formik>

                        

                        

                    </div>
                </div>
                <div className="authform__item">
                    <div className="authform__item_in authform__ex authform__panel">
                        Есть аккаунт? <Link className='authform__ex_link' to='/login'>Вход</Link>
                    </div>
                </div>
                
                <div className="authform__item">
                    <div className="authform__item_in authform__download authform__panel">
                        <div className="authform__download_item">
                            <a href="#" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={googlePlay} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                            </a>
                        </div>
                        <div className="authform__download_item">
                            <a href="#" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={appleBadge} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default SigninForm;