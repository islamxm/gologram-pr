import {Navigate} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

export const CheckAuth = ({children}) => {
    const {token} = useAuth();
    if(!token) {
        return <Navigate to='/login'></Navigate>
    }

    return (
        <>
            {children}
        </>
    )
}

// export default CheckAuth;