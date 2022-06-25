import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/login/Login';
import Signin from '../pages/signin/Signin';
import ProfileSelf from '../pages/profileSelf/ProfileSelf';
import None from '../none/None';
import PageLoading from '../pageLoading/PageLoading';
import {CheckAuth} from '../../hoc/CheckAuth';
import {AuthProvider} from '../../hoc/AuthProvider';
import Settings from '../pages/settings/Settings';


function App() {
    
    return (
        <div className="wrapper">
            <main className="main">
                <AuthProvider>
                    <PageLoading/>
                    <Routes>
                        <Route exact path='/signin' element={<Signin/>}/>
                        <Route exact path='/login' element={<Login/>}/>

                        <Route exact path='/' element={<CheckAuth><ProfileSelf/></CheckAuth>}/>
                        <Route exact path='/profile-self' element={<CheckAuth><ProfileSelf/></CheckAuth>}/>

                        <Route exact path='/settings' element={<CheckAuth><Settings/></CheckAuth>}/>
                        
                        <Route exact path='*' element={<None/>}/>
                    </Routes>
                </AuthProvider>
            </main>
        </div>
    )
}

export default App;