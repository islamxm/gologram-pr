import {Route, Redirect, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function GuestRoute ({children, ...rest}) {
    const auth = useAuth();
    const history = useNavigate();

   
}