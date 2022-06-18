import { Formik, Field, Form, replace } from 'formik';
import useAuth from '../../hooks/useAuth';
import AuthInput from '../authInput/AuthInput';
import './ChangePass.scss';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { regulars } from '../../services/regulars';
import * as Yup from 'yup';
import Button from '../button/Button';
import { useState } from 'react';



const service = new authService();

const ChangePass = () => {
    const navigate = useNavigate();
    const [errorOld, setErrorOld] = useState(null);
    const [errorNew, setErrorNew] = useState(null);

    const userData = useAuth();

    return (
        <div className="changePass">
            <Formik
                initialValues={{
                    current_password: '',
                    new_password: '',
                }}
                onSubmit={(values, {setSubmitting}) => {
                    service.changePassword(userData.token, values).then(res => {
                        setSubmitting(false);
                        console.log(res);
                        setErrorNew(res.data?.validate_errors?.new_password ? res.data.validate_errors.new_password : null);
                        setErrorOld(res.data?.validate_errors?.current_password ? res.data.validate_errors.current_password : null);

                        if(res.response.status === 'successfully' && res.response.code === 200) {
                            userData.removeGlobalToken();
                            navigate('/login', {replace: true})
                        }
                    })
                    
                    
                }}>
                {({isSubmitting}) => (
                    <Form
                        className="changePass__form">
                            <div className="changePass__form_item"> 
                                <div className="changePass__form_item_name">Старый пароль</div>
                                <div className="changePass__form_item_body">
                                    <div className="changePass__form_item_body_field">
                                        <AuthInput type="password" name="current_password"/>
                                        <div className="changePass__form_item_body_field_error">
                                            {errorOld}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="changePass__form_item"> 
                                <div className="changePass__form_item_name">Новый пароль</div>
                                <div className="changePass__form_item_body">
                                    <div className="changePass__form_item_body_field">
                                        <AuthInput type="password" name="new_password"/>
                                        <div className="changePass__form_item_body_field">
                                            {errorNew}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="changePass__form_action">
                                <div className="changePass__form_action_item">
                                    <Button disabled={isSubmitting} type='submit' classList="button__orange" buttonText="Сменить пароль"/>
                                </div>
                            </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePass;