import './messages.scss';
import {message} from 'antd';

const EmptyIcon = () => {
    return (
        <div className="emtyIcon"></div>
    )
}
const messages = {
    success: (text) => {
        message.success({
            content: text,
            icon: <EmptyIcon/>,
            className: 'message-success'
        });
    },
    error: (text) => {
        message.error({
            content: text,
            icon: <EmptyIcon/>,
            className: 'message-error'
        });
    }
}

export default messages;