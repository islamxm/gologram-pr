


import authService from '../../services/authService';

import './Button.scss';

const Button = (props) => {

    const {classList, type, icon, text, disabled, buttonText} = props;
    
    return(
        <button disabled={disabled} className={'button ' + classList} type={type}>
            <div className="button__text">{buttonText}</div>
            {icon ? <div className='button__icon'>{icon}</div> : null}
        </button>
    )
}


export default Button;