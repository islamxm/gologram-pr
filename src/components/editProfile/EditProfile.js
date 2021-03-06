import './EditProfile.scss';
import '../../components/signinForm/Authform.scss'

import { Formik, Field, Form } from 'formik';
import { useState, useEffect } from 'react';

import messages from '../messages/messages';
import useAuth from '../../hooks/useAuth';
import AuthInput from '../authFields/AuthInput';
import Button from '../button/Button';
import authService from '../../services/authService';
import AuthTextarea from '../authFields/AuthTextarea';

import useUserData from '../../hooks/useUserData';


const service = new authService();


const EditProfile = () => {
    const userData = useAuth();
    const {avatar,
        username,
        description,
        firstName,
        lastName,
        followers,
        followings,
        userId,
        isConfirmed,
        link,
        profStatus,
        profType,
        posts,
        sex,
        setAvatar,
        setUsername,
        setDescription,
        setFirstName,
        setLastName,
        setFollowers,
        setFollowings,
        setUserId,
        setIsConfirmed,
        setLink,
        setProfStatus,
        setProfType,
        setPosts,
        setSex} = useUserData();

    const [usernameText, setUsernameText ] = useState(null);
    const [firstnameText, setFirstnameText] = useState(null);
    const [lastnameText, setLastnameText] = useState(null);
    const [sexText, setSexText] = useState(null);
    const [linkText, setLinkText] = useState(null);
    const [typeText, setTypeText] = useState(null);
    const [statusText, setStatusText] = useState(null);
    const [descritionText, setDescriptionText] = useState(null);

    // const [username, setUsername] = useState(null);
    // const [firstname, setFirstname] = useState(null);
    // const [lastname, setLastname] = useState(null);
    // const [sex, setSex] = useState(null);
    // const [link, setLink] = useState(null);
    // const [description, setDescription] = useState(null);
    // const [profiletype, setProfiletype] = useState(null);
    // const [profilestatus, setProfilestatus] = useState(null);


    useEffect(() => {
        userData.setGlobalReqLoad(true);
        service.getProfileAdvanced(userData.token)
        .then(({data}) => {
            setUsername(data.username);
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setSex(data.sex);
            setLink(data.link);
            setDescription(data.description);
            setProfType(data.profile_type);
            setProfStatus(data.profile_status);
            userData.setGlobalReqLoad(false);
        })
    // eslint-disable-next-line 
    },[])


    return (
        <div className="editProfile">
            <Formik
                enableReinitialize={true}
                initialValues={{    
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    description: description,
                    sex: sex,
                    link: link,
                    profile_type: profType,
                    profile_status: profStatus,
                }}
                onSubmit={(values, {setSubmitting}) => {
                    userData.setGlobalReqLoad(true);
                    service.changeProfileInfo(userData.token, values).then(res => {
                        setSubmitting(true);
                        if(res.response.code === 200 && res.response.status === 'successfully') {
                            setUsername(values.username);
                            setFirstName(values.first_name);
                            setLastName(values.last_name);
                            setDescription(values.description);
                            setSex(values.sex);
                            setLink(values.link);
                            setProfType(values.profile_type);
                            setProfStatus(values.profile_status);
                            messages.success('?????????????????? ?????????????? ??????????????????');
                        } else {
                            setUsernameText(res.data?.validate_errors?.username ? res.data.validate_errors.username : null);
                            setFirstnameText(res.data?.validate_errors?.first_name ? res.data.validate_errors.first_name : null);
                            setLastnameText(res.data?.validate_errors?.last_name ? res.data.validate_errors.last_name : null);
                            setSexText(res.data?.validate_errors?.sex ? res.data.validate_errors.sex : null);
                            setLinkText(res.data?.validate_errors?.link ? res.data.validate_errors.link : null);
                            setTypeText(res.data?.validate_errors?.profile_type ? res.data.validate_errors.profile_type : null);
                            setStatusText(res.data?.validate_errors?.profile_status ? res.data.validate_errors.profile_status : null);
                            setDescriptionText(res.data?.validate_errors?.description ? res.data.validate_errors.description : null);
                            console.log('error');
                            messages.error('?????????????????? ????????????');
                        }
                        userData.setGlobalReqLoad(false);  
                    })
                    

                }}>
                {({isSubmitting}) => (
                    <Form
                        className="editProfile__form">
                            <div className="editProfile__form_item"> 
                                <div className="editProfile__form_item_name">??????<span>*</span></div>
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
                                <div className="editProfile__form_item_name">??????????????<span>*</span></div>
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
                                <div className="editProfile__form_item_name">??????<span>*</span></div>
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
                                <div className="editProfile__form_item_name">??????-????????</div>
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
                                <div className="editProfile__form_item_name">?? ????????</div>
                                <div className="editProfile__form_item_body">
                                    <div className="editProfile__form_item_body_field">
                                        <AuthTextarea type="text" name="description"/>
                                        <div className="editProfile__form_item_body_field_error">
                                            {descritionText}
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">??????<span>*</span></div>
                                <div className="editProfile__form_item_body radio__list">
                                    <div className="editProfile__form_item_radio">
                                        <Field
                                            type='radio'
                                            name='sex'
                                            value='man'
                                            id='man'/>
                                        <label htmlFor="man" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">??????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field
                                            type='radio'
                                            name='sex'
                                            value='women'
                                            id='women'/>
                                        <label htmlFor="women" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">??????????????</div>
                                        </label>
                                    </div>
                                    <div className="radio__list_error">
                                        {sexText}
                                    </div>
                                </div>
                            </div>

                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">?????????????? ????????????????</div>
                                <div className="editProfile__form_item_body radio__list">
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio'
                                            value='work'
                                            name='profile_status'
                                            id='ps1'/>
                                        <label htmlFor="ps1" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">
                                                ??????????????
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
                                                ??????????????
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
                                                ?? ??????????????
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
                                                ?? ????????????
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
                                                ?????? ?? ????????????
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
                                                ?????????????????? ??????????????????????
                                            </div>
                                        </label>
                                    </div>
                                    <div className="radio__list_error">
                                        {statusText}
                                    </div>
                                </div>
                            </div>

                            <div className="editProfile__form_item">
                                <div className="editProfile__form_item_name">?????? ?????????? ????????????????????????</div>
                                <div className="editProfile__form_item_body radio__list">
                                <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='simple_user' 
                                            name='profile_type' 
                                            id='pt1'/>
                                        <label htmlFor="pt1" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">????????????????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='blogger' 
                                            name='profile_type' 
                                            id='pt2'/>
                                        <label htmlFor="pt2" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">??????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='self_employed' 
                                            name='profile_type' 
                                            id='pt3'/>
                                        <label htmlFor="pt3" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">??????????????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='individual_entrepreneurship' 
                                            name='profile_type' 
                                            id='pt4'/>
                                        <label htmlFor="pt4" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='startapp' 
                                            name='profile_type' 
                                            id='pt5'/>
                                        <label htmlFor="pt5" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">??????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='small_business' 
                                            name='profile_type' 
                                            id='pt6'/>
                                        <label htmlFor="pt6" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">?????????? ????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='medium_business' 
                                            name='profile_type' 
                                            id='pt7'/>
                                        <label htmlFor="pt7" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">?????????????? ????????????</div>
                                        </label>
                                    </div>
                                    <div className="editProfile__form_item_radio">
                                        <Field 
                                            type='radio' 
                                            value='large_business' 
                                            name='profile_type' 
                                            id='pt8'/>
                                        <label htmlFor="pt8" className="editProfile__form_item_radio_label">
                                            <div className="editProfile__form_item_radio_label_text">?????????????? ????????????</div>
                                        </label>
                                    </div>
                                    <div className="radio__list_error">
                                        {typeText}
                                    </div>
                                    <div className="editProfile__form_item_body_text">
                                        **?????? ???????????????????????? ?????????? ?????????????? ???????????? ???????? ??????. ??????????????????????????????????.
                                    </div>
                                </div>
                            </div>
                            
                            <div className="editProfile__form_action">
                                <div className="editProfile__form_action_item">
                                    <Button classList="button__orange" type="submit" buttonText="??????????????????"/>
                                </div>
                            </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditProfile;