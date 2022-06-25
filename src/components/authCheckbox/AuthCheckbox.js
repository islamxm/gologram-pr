import {CheckOutlined} from '@ant-design/icons';
import { useField } from 'formik';

const AuthCheckbox = ({...props}) => {

    const [field] = useField(props);

    return (
        <div className="authform__main_item_checkbox">
            <input {...props} {...field} id='save' className='authform__main_item_checkbox_input'/>
            <label htmlFor="save" className="authform__main_item_checkbox_label">
                <div className="authform__main_item_checkbox_label_icon">
                    <CheckOutlined />
                </div>
                <div className="authform__main_item_checkbox_label_text">Запомнить меня</div>
            </label>
            
        </div>
    )
}

export default AuthCheckbox;