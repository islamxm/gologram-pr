import './AuthInput.scss';

import { useField } from 'formik';
import { Input } from 'antd';


const AuthInput = ({...props}) => {

    const [field, meta] = useField(props);

    return (
        <div className='authInput'>

            <Input {...props} {...field}/>
            
        </div>
    )
}

export default AuthInput;