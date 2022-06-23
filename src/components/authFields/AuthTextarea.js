import { useField } from 'formik';
import { Input } from 'antd';

import vars from '../vars/vars';
import './AuthInput.scss';








const AuthTextarea = ({...props}) => {

    const [field, meta] = useField(props);


    return (
        <div className='authInput'>
            <Input.TextArea maxLength={145} showCount {...props} {...field}/>
        </div>
    )
}

export default AuthTextarea;