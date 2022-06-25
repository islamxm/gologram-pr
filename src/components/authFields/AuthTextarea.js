import './AuthInput.scss';

import { useField } from 'formik';
import { Input } from 'antd';


const AuthTextarea = ({...props}) => {

    const [field] = useField(props);


    return (
        <div className='authInput'>
            <Input.TextArea maxLength={145} showCount {...props} {...field}/>
        </div>
    )
}

export default AuthTextarea;