import './ChangePass.scss';

import { useState } from 'react';
import { Formik, Form} from 'formik';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import AuthPassword from '../authFields/AuthPassword';
import messages from '../messages/messages';
import authService from '../../services/authService';
import Button from '../button/Button';




const service = new authService();

const ChangePass = () => {
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
                        setErrorNew(res.data?.validate_errors?.new_password ? res.data.validate_errors.new_password : null);
                        setErrorOld(res.data?.validate_errors?.current_password ? res.data.validate_errors.current_password : null);

                        if(res.response.status === 'successfully' && res.response.code === 200) {
                            messages.success();
                            values.current_password = '';
                            values.new_password = '';
                        } else {
                            messages.error();
                        }
                    })
                    
                    
                }}>
                {({isSubmitting}) => (
                    <Form
                        className="changePass__form">
                            <div className="changePass__form_item"> 
                                <div className="changePass__form_item_name">Текущий пароль</div>
                                <div className="changePass__form_item_body">
                                    <div className="changePass__form_item_body_field">
                                        <AuthPassword name="current_password"/>
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
                                        <AuthPassword name="new_password"/>
                                        <div className="changePass__form_item_body_field_error">
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