import './messages.scss';

import {message} from 'antd';

const messages = {
    success: () => {
        message.success('Настройки успешно сохранены');
    },
    error: () => {
        message.error('Произошла ошибка');
    }
}

export default messages;