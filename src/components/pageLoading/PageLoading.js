import {
    LoadingOutlined
  } from '@ant-design/icons';
import './PageLoading.scss';

import useAuth from '../../hooks/useAuth';

const PageLoading = () => {
    const {reqLoad} = useAuth();
    
    return (
        <div className={reqLoad ? 'pageLoading show' : 'pageLoading hide'}>
            <div className="pageLoading__icon">
                <LoadingOutlined/>
            </div>
        </div>
    )
}

export default PageLoading;