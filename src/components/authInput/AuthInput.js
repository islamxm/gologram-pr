import { useField } from 'formik';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';
// import Tippy from '@tippyjs/react';
// import 'tippy.js/dist/tippy.css';

import vars from '../vars/vars';
import './AuthInput.scss';




const modifiedErrorIcon = (
    <CloseOutlined style={{color: 'red'}}/>
)

const modifiedSuccessIcon = (
    <CheckOutlined style={{color: 'green'}}/>
)


const AuthInput = ({...props}) => {

    const [field, meta] = useField(props);


    return (
        <div className='authInput'>
            <div className="authInput__inner">
                <div className="authInput__main">
                    <input
                        {...props} {...field}>
                    </input>
                </div>
                <div className="authInput__status">
                    {meta.touched && meta.error ? modifiedErrorIcon : null}
                </div>
            </div>
            {/* Сюда нужно вывести ошибку от сервера */}
            <div className="authInput__ex"></div>
        </div>
    )
}

export default AuthInput;