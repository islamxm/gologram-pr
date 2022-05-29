import AuthInput from "../authInput/AuthInput";

import './AuthInvite.scss';

const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{3,6}$/;


const AuthInvite = () => {
    return (
        <div className="authInvite">
            <h3 className="authInvite__head">Пригласи двух друзей</h3>

            <div className="authInvite__item">

                <AuthInput
                    name='email_invite_1'
                    placeholder="e-mail 1"
                    reg={regEmail}
                    type="text"
                    />

            </div>
            <div className="authInvite__item">

                <AuthInput
                    name='email_invite_2'
                    placeholder="e-mail 2"
                    reg={regEmail}
                    type="text"
                    />

            </div>
        </div>
    )
}

export default AuthInvite;