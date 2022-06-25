
import {LoadingOutlined} from '@ant-design/icons';

import './Button.scss';

const Button = (props) => {

    const {classList, type, icon, text, disabled, buttonText, onClickHandle} = props;
    
    return(
        <button 
            onClick={onClickHandle} 
            disabled={disabled} 
            className={'button ' + classList} 
            type={type}>
                {disabled ? <div className="button__mask"><LoadingOutlined/></div> : null}
                <div className="button__text">{buttonText}</div>
                {icon ? <div className='button__icon'>{icon}</div> : null}
                
        </button>
    )
}


export default Button;