//GLOBAL PACKAGES
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import AuthInput from '../authInput/AuthInput';
import Cookies from 'js-cookie';
import {
    Tooltip,
  } from 'react-tippy';



//LOCAL COMPONENTS
import authService from '../../services/authService';
import { regulars } from '../../services/regulars';

import Button from '../button/Button';
// import AuthInvite from '../authInvite/AuthInvite';




//IMAGES
import logoMain from '../../img/logo-main.svg';
import googlePlay from '../../img/google-play-badge.png';
import appleBadge from '../../img/apple-badge.svg';


//STYLES
import './Authform.scss';


const service = new authService();


const modifiedErrorIcon = (
    <CloseOutlined style={{color: 'red'}}/>
)

const modifiedSuccessIcon = (
    <CheckOutlined style={{color: 'green'}}/>
)


const SigninForm = () => {

    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();
    service.getProfileAdvanced('17102ca34fad7c3a4af0752c42ac17e87b9e6837').then(res => console.log(res))
    

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
                            validationSchema={Yup.object({
                                username: Yup.string()
                                        .matches(regulars.regNickname)
                                        .required(modifiedErrorIcon),
                                password: Yup.string()
                                        .matches(regulars.regPassword)
                                        .required(modifiedErrorIcon),
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                service.logIn(values).then(res => {
                                    console.log(res);
                                    console.log(res.non_field_errors)
                                    setErrorText(res.non_field_errors ? res.non_field_errors.join() : null)
                                    if(res.auth_token) {
                                        Cookies.set('token', res.auth_token)
                                        nav('/profile-self', {replace: true})
                                    }
                                    setSubmitting(false)
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
                                            {errorText}
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
                                            {errorText}
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


export default SigninForm;