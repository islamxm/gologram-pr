import './messages.scss';

import {message} from 'antd';

const messages = {
    success: (text) => {
        message.success(text);
    },
    error: (text) => {
        message.error(text);
    }
}

export default messages;