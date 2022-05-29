//REACT MODULES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



//STYLES
import './App.scss';


//MODULES
import Login from '../pages/login/Login';
import Signin from '../pages/signin/Signin';
import ProfileSelf from '../pages/profileSelf/ProfileSelf';
import None from '../none/None';
import useAuth from '../../hooks/useAuth';

// MAIN COMPONENT
function App() {
    // const auth = useAuth();


    return (
        <div className="wrapper">
            <main className="main">
                <Routes>
                    <Route exact path='/signin' element={<Signin/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/profile-self' element={<ProfileSelf/>}/>
                    <Route exact path='*' element={<None/>}/>
                </Routes>
            </main>
        </div>
    )

    
}

export default App;