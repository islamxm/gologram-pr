import {message} from 'antd';
import './messages.scss';

const messages = {
    success: () => {
        message.success('Настройки успешно сохранены');
    },
    error: () => {
        message.error('Произошла ошибка');
    }
}

export default messages;