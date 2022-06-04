//REACT MODULES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



//STYLES
import './App.scss';


//MODULES
import Login from '../pages/login/Login';
import Signin from '../pages/signin/Signin';
import ProfileSelf from '../pages/profileSelf/ProfileSelf';
import None from '../none/None';
//hoc
import {CheckAuth} from '../../hoc/CheckAuth';
import {AuthProvider} from '../../hoc/AuthProvider';




// MAIN COMPONENT
function App() {
    
    return (
        <div className="wrapper">
            <main className="main">
                <AuthProvider>
                    <Routes>
                        <Route exact path='/signin' element={<Signin/>}/>
                        <Route exact path='/login' element={<Login/>}/>


                        <Route exact path='/' element={<CheckAuth><ProfileSelf/></CheckAuth>}/>


                        
                        {/* <Route exact path='/profile-self' element={<CheckAuth><ProfileSelf/></CheckAuth>}/> */}



                        <Route exact path='*' element={<None/>}/>
                    </Routes>
                </AuthProvider>
            </main>
        </div>
    )

    
}

export default App;