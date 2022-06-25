import './AuthInput.scss';

import { useField } from 'formik';
import { Input } from 'antd';


const AuthPassword = ({...props}) => {

    const [field] = useField(props);


    return (
        <div className='authInput'>
            <Input.Password {...props} {...field}/>
        </div>
    )
}

export default AuthPassword;