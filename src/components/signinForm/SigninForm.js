//GLOBAL PACKAGES
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
import AuthInput from '../authInput/AuthInput';
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
import 'react-tippy/dist/tippy.css';


const service = new authService();


const modifiedErrorIcon = (
    <CloseOutlined style={{color: 'red'}}/>
)

const modifiedSuccessIcon = (
    <CheckOutlined style={{color: 'green'}}/>
)




const SigninForm = () => {

    let nav = useNavigate();
    
    const [emailText, setEmailText] = useState(null);
    const [usernameText, setUsernameText ] = useState(null);
    const [firstnameText, setFirstnameText] = useState(null);
    const [lastnameText, setLastnameText] = useState(null);
    const [passwordText, setPasswordText] = useState(null);

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
                            }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                        .matches(regulars.regEmail)
                                        .required(),
                                username: Yup.string()
                                        .matches(regulars.regNickname)
                                        .required(modifiedErrorIcon),
                                first_name: Yup.string()
                                        .matches(regulars.regName)
                                        .required(modifiedErrorIcon),
                                last_name: Yup.string()
                                        .matches(regulars.regName)
                                        .required(modifiedErrorIcon),
                                password: Yup.string()
                                        .matches(regulars.regPassword)
                                        .required(modifiedErrorIcon),
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                service.signIn(values).then(res => {
                                    console.log(res);

                                    setEmailText(typeof(res.email) === 'object' ? res.email.join() : null);
                                    setUsernameText(typeof(res.username) === 'object' ? res.username.join() : null);
                                    setFirstnameText(typeof(res.first_name) === 'object' ? res.first_name.join() : null);
                                    setLastnameText(typeof(res.last_name) === 'object' ? res.last_name.join() : null);
                                    setPasswordText(typeof(res.password) === 'object' ? res.password.join() : null);
                                    console.log(res.id)
                                    if(res.id) {
                                        nav('/login', {replace: true});
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
                                            title='минимум 6 символов, латинские бувы и цифры'
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