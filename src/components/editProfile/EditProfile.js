import './EditProfile.scss';
import '../../components/signinForm/Authform.scss'
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import AuthInput from '../authInput/AuthInput';
import Button from '../button/Button';
import authService from '../../services/authService';
import SexSelect from '../sexSelect/SexSelect';
const service = new authService();

const EditProfile = () => {
    const userData = useAuth();
    

    const [usernameText, setUsernameText ] = useState(null);
    const [firstnameText, setFirstnameText] = useState(null);
    const [lastnameText, setLastnameText] = useState(null);
    const [sexText, setSexText] = useState(null);
    const [linkText, setLinkText] = useState(null);
    const [typeText, setTypeText] = useState(null);
    const [statusText, setStatusText] = useState(null);
    const [descritionText, setDescriptionText] = useState(null);

    return (
        <div className="editProfile">
            <Formik
                initialValues={{
                    username: userData.username,
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    description: userData.description !== 'null' ? userData.description : '',
                    sex: userData.sex,
                    link: userData.link !== 'null' ? userData.link : '',
                    profile_type: userData.profileType !== 'null' ? userData.profileType : '',
                    profile_status: userData.profileStatus !== 'null' ? userData.profileStatus : '',
                }}
                onSubmit={(values, {setSubmitting}) => {
                    
                    // console.log(values);
                    service.changeProfileInfo(userData.token, values).then(res => {
                        setSubmitting(true);
                        if(res.response.code === 200 && res.response.status === 'successfully') {
                            userData.setGlobalUsername(values.username);
                            userData.setGlobalFirstName(values.first_name);
                            userData.setGlobalLastName(values.last_name);
                            userData.setGlobalDescription(values.description);
                            userData.setGlobalSex(values.sex);
                            userData.setGlobalLink(values.link);
                            userData.setGlobalProfileType(values.profile_type);
                            userData.setGlobalProfileStatus(values.profile_status);
                        } else {
                            console.log('error');
                        }


                        setUsernameText(res.data?.validate_errors?.username ? res.data.validate_errors.username : null);
                        setFirstnameText(res.data?.validate_errors?.first_name ? res.data.validate_errors.first_name : null);
                        setLastnameText(res.data?.validate_errors?.last_name ? res.data.validate_errors.last_name : null);
                        setSexText(res.data?.validate_errors?.sex ? res.data.validate_errors.sex : null);
                        setLinkText(res.data?.validate_errors?.link ? res.data.validate_errors.link : null);
                        setTypeText(res.data?.validate_errors?.profile_type ? res.data.validate_errors.profile_type : null);
                        setStatusText(res.data?.validate_errors?.profile_status ? res.data.validate_errors.profile_status : null);
                        setDescriptionText(res.data?.validate_errors?.description ? res.data.validate_errors.description : null);
                        console.log(res);
                        setSubmitting(false);
                    })
                    

                }}>
                {({isSubmitting}) => (
                    <Form
                        className="editProfile__form">
                            <div className="editProfile__form_item"> 
                                <div className="editProfile__form_item_name">Имя</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthInput type="text" name="first_name"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {firstnameText}
                                        </div>
                                    </div>
                                    <div className="editProfile__form_item_body_text">
                                    </div>
                                </div>
                            </div>
                            <div className="editProfile__form_item"> 
                                <div className="editProfile__form_item_name">Фамилия</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthInput type="text" name="last_name"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {lastnameText}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">Ник</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthInput type="text" name="username"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {usernameText}
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">Веб-сайт</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthInput type="text" name="link"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {linkText}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">О себе</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthInput type="text" name="description"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {descritionText}
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">Пол</div>
                                <div className="editProfile__form_item_body radio__list">
                                    <div className="editProfile__form_item_radio">
                                        <Field
                                            type='radio'
                                            name='sex'
                                            value='man'
                                            id='man'/>
                                        <label htmlFor="man" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">мужчина</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field
                                            type='radio'
                                            name='sex'
                                            value='women'
                                            id='women'/>
                                        <label htmlFor="women" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">женщина</div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">Статусы аккаунта</div>
                                <div className="editProfile__form_item_body radio__list">
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='work'
                                            name='profile_status'
                                            id='ps1'/>
                                        <label htmlFor="ps1" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                работаю
                                            </div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='rest'
                                            name='profile_status'
                                            id='ps2'/>
                                        <label htmlFor="ps2" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                отдыхаю
                                            </div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='leave'
                                            name='profile_status'
                                            id='ps3'/>
                                        <label htmlFor="ps3" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                в отпуске
                                            </div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='traffic_jam'
                                            name='profile_status'
                                            id='ps4'/>
                                        <label htmlFor="ps4" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                в пробке
                                            </div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='driving_from_work'
                                            name='profile_status'
                                            id='ps5'/>
                                        <label htmlFor="ps5" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                еду с работы
                                            </div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='creation'
                                            name='profile_status'
                                            id='ps6'/>
                                        <label htmlFor="ps6" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                занимаюсь творчеством
                                            </div>
                                        </label>
                                    </div>
                                    <div className="radio__list_error">
                                        {statusText}
                                    </div>
                                </div>
                            </div>

                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">Вид вашей деятельности</div>
                                <div className="editProfile__form_item_body radio__list">
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='blogger' 
                                            name='profile_type' 
                                            id='pt1'/>
                                        <label htmlFor="pt1" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Блоггер</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='self_employed' 
                                            name='profile_type' 
                                            id='pt2'/>
                                        <label htmlFor="pt2" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Самозанятый</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='individual_entrepreneurship' 
                                            name='profile_type' 
                                            id='pt3'/>
                                        <label htmlFor="pt3" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">ИП</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='startapp' 
                                            name='profile_type' 
                                            id='pt4'/>
                                        <label htmlFor="pt4" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Стартап</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='small_business' 
                                            name='profile_type' 
                                            id='pt5'/>
                                        <label htmlFor="pt5" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Малый бизнес</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='medium_business' 
                                            name='profile_type' 
                                            id='pt6'/>
                                        <label htmlFor="pt6" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Средний бизнес</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='large_business' 
                                            name='profile_type' 
                                            id='pt7'/>
                                        <label htmlFor="pt7" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">Крупный бизнес</div>
                                        </label>
                                    </div>
                                    <div className="radio__list_error">
                                        {typeText}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="editProfile__form_action">
                                <div className="editProfile__form_action_item">
                                    <Button classList="button__orange" type="submit" buttonText="Сохранить"/>
                                </div>
                            </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditProfile;