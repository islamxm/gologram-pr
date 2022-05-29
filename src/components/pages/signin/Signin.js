//GLOBAL 
import { Row, Col } from 'antd';


//MODULES
import MainSlider from '../../mainSlider/MainSlider';
// import Authform from '../../authform/Authform';
import SigninForm from '../../signinForm/SigninForm';


//STYLES
import '../../../styles/global.scss';
import './Signin.scss';



const Signin = () => {
    return(
        <div className="signin auth">
            <div className="container">
                <Row justify='center' align='middle'>
                    <Col span={12}>
                        <MainSlider/>
                    </Col>
                
                    <Col align='middle' span={12}>
                        <SigninForm/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Signin;