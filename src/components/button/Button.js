import './Button.scss';

import {LoadingOutlined} from '@ant-design/icons';


const Button = (props) => {

    const {classList, type, icon, disabled, buttonText, onClickHandle, style} = props;
    
    return(
        <button 
            onClick={onClickHandle} 
            disabled={disabled} 
            className={'button ' + classList} 
            type={type}
            style={style}>
                {disabled ? <div className="button__mask"><LoadingOutlined/></div> : null}
                <div className="button__text">{buttonText}</div>
                {icon ? <div className='button__icon'>{icon}</div> : null}
                
        </button>
    )
}


export default Button;