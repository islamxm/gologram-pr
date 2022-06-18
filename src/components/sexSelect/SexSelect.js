import { Select } from 'antd';
import { Field} from 'formik';
const { Option } = Select;


const SexSelect = (props) => {
    return (
        <Select  placeholder='укажите пол...'>
            <Option value='man'>
                <div className="authform__main_item_select_item">
                    <Field type="radio" id='man' name='sex' value='man'/>
                    <label htmlFor="man" className='authform__main_item_select_item_label'>Мужчина</label>
                </div>
            </Option>
            <Option value='woman'>
                <div className="authform__main_item_select_item">
                    <Field type="radio" id='women' name='sex' value='women'/>
                    <label htmlFor="women" className='authform__main_item_select_item_label'>Женщина</label>
                </div>
            </Option>
        </Select>
    )
}

export default SexSelect;