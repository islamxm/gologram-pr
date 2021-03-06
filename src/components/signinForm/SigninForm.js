import './Authform.scss';
import 'react-tippy/dist/tippy.css';

import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Formik, Form} from 'formik';
import {
    Tooltip,
} from 'react-tippy';

import AuthInput from '../authFields/AuthInput';
import AuthPassword from '../authFields/AuthPassword';
import useAuth from '../../hooks/useAuth';
import SexSelect from '../sexSelect/SexSelect';
import authService from '../../services/authService';
import Button from '../button/Button';

//IMAGES
import logoMain from '../../img/logo-main.svg';
import googlePlay from '../../img/google-play-badge.png';
import appleBadge from '../../img/apple-badge.svg';


const service = new authService();

const SigninForm = () => {

    let nav = useNavigate();
    const {setGlobalReqLoad} = useAuth();
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
                                setGlobalReqLoad(true);
                                service.signIn(values).then(res => {
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
                                    setGlobalReqLoad(false);
                                    setSubmitting(false);
                                })
                            }}>

                            {({isSubmitting}) => (
                                <Form className="authform__main_body">
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='?????? e-mail'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='email' placeholder="?????????????? e-mail"/>
                                        </Tooltip>
                                        <div className="authform__main_item_ex">
                                            {emailText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='?????????????? 3 ????????????????, ?????????????????? ???????? ?? ??????????'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='username' placeholder="?????????????? ??????????????"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {usernameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='???????? ??????'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='first_name' placeholder="?????????????? ??????"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {firstnameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='???????? ??????????????'
                                            position='top'
                                            trigger='mouseenter'>
                                            <AuthInput type="text" name='last_name' placeholder="?????????????? ??????????????"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {lastnameText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        <Tooltip
                                            title='???????????? ???????????? ?????????????????? ?????????????? 8 ????????????????, ?????????????????? ?? ???????????????? ?????????? ???? ????????????????, ????????. ?????????????? ?? ??????????'
                                            position='top'
                                            trigger='mouseenter'
                                            >
                                            <AuthPassword name='password' placeholder="?????????????? ????????????"/>
                                        </Tooltip>
                                        
                                        <div className="authform__main_item_ex">
                                            {passwordText}
                                        </div>
                                    </div>
                                    <div className="authform__main_item">
                                        {/* <div className="authform__main_item_name">?????? ??????</div> */}
                                        <div className="authform__main_item_select">
                                            <SexSelect/>
                                        </div>
                                        

                                        <div className="authform__main_item_ex">
                                            {sexText}
                                        </div>
                                    </div>
                                    <div className="authform__action">
                                        <Button type='submit' disabled={isSubmitting} buttonText='??????????????????????' classList={'button__orange'}/>
                                    </div>
                                </Form>
                            )}

                            

                        </Formik>

                        

                        

                    </div>
                </div>
                <div className="authform__item">
                    <div className="authform__item_in authform__ex authform__panel">
                        ???????? ??????????????? <Link className='authform__ex_link' to='/login'>????????</Link>
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