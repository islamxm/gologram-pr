//GLOBAL PACKAGES
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import AuthInput from '../authInput/AuthInput';
import {Tooltip} from 'react-tippy';

//LOCAL COMPONENTS
import authService from '../../services/authService';
import { regulars } from '../../services/regulars';
import Button from '../button/Button';
// import AuthInvite from '../authInvite/AuthInvite';

import useAuth from '../../hooks/useAuth';




//IMAGES
import logoMain from '../../img/logo-main.svg';
import googlePlay from '../../img/google-play-badge.png';
import appleBadge from '../../img/apple-badge.svg';


//STYLES
import './Authform.scss';


const service = new authService();


// const modifiedErrorIcon = (
//     <CloseOutlined style={{color: 'red'}}/>
// )


const LoginForm = () => {


    const {setGlobalToken} = useAuth();

    const [errorText, setErrorText] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const nav = useNavigate();
    const location = useLocation();

    
    

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
                                username: '',
                                password: '',
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                service.logIn(values).then(res => {
                                    setSubmitting(true);
                                    console.log(res);
                                    setErrorUsername(res.data?.validate_errors?.username ? res.data.validate_errors.username.join() : null);
                                    setErrorPassword(res.data?.validate_errors?.password ? res.data.validate_errors.password.join() : null);
                                    setErrorText(res.data?.validate_errors?.non_field_errors ? res.data.validate_errors.non_field_errors.join() : null);
                                    if(res.data.auth_token) {
                                        setGlobalToken(res.data.auth_token);
                                        nav('/profile-self', {replace: true})
                                        // console.log(res.data.auth_token);
                                    } 
                                    setSubmitting(false);
                                    
                                })
                            }}>

                            {({isSubmitting}) => (
                                <Form className="authform__main_body">
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='ваш логин'
                                            position='top'
                                            trigger='mouseenter'>
                                             <AuthInput type="text" name='username' placeholder="введите никнейм"/>
                                        </Tooltip>
                                       
                                        <div className="authform__main_item_ex">
                                            {errorUsername}{errorText}
                                        </div>
                                    </div>
                                    
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='ваш пароль'
                                            position='top'
                                            trigger='mouseenter'>
                                             <AuthInput type="password" name='password' placeholder="введите пароль"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {errorPassword}{errorText}
                                        </div>
                                    </div>
                                    
                                    <div className="authform__action">
                                        <Button type='submit' disabled={isSubmitting} buttonText='Войти' classList={'button__orange'}/>
                                    </div>
                                </Form>
                            )}

                            

                        </Formik>

                        

                        

                    </div>
                </div>
                <div className="authform__item">
                    <div className="authform__item_in authform__ex authform__panel">
                        Еще нет аккаунта? <Link className='authform__ex_link' to='/signin'>Зарегистрируйтесь</Link>
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


export default LoginForm;