//GLOBAL 
import { Row, Col } from 'antd';

//MODULES
import MainSlider from '../../mainSlider/MainSlider';
import LoginForm from '../../loginForm/LoginForm';

//STYLES
import '../../../styles/global.scss';
import './Login.scss';


const Login = () => {

    return (
        <div className="auth login">
            <div className="container">
                <Row justify='center' align='middle'>


                    <Col span={12}>
                        <MainSlider/>
                    </Col>

                    <Col align='middle' span={12}>
                        <LoginForm/>
                    </Col>


                </Row>
            </div>
        </div>
    )
}

export default Login;