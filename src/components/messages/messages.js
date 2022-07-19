import './messages.scss';
import {message} from 'antd';
import { MessageTwoTone
  } from '@ant-design/icons';

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
    },
    default: (text) => {
        message.info({
            content: text,
            icon: <MessageTwoTone twoToneColor='#FF8B00' style={{fontSize: '20px'}} />,
            className: 'message-default'
        })
    }
}

export default messages;