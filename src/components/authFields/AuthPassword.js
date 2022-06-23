import { useField } from 'formik';
import {CloseOutlined, CheckOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import vars from '../vars/vars';

import './AuthInput.scss';







const AuthPassword = ({...props}) => {

    const [field, meta] = useField(props);


    return (
        <div className='authInput'>
            <Input.Password {...props} {...field}/>
        </div>
    )
}

export default AuthPassword;