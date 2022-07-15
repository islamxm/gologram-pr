import {Modal} from 'antd';
import './PostRepost.scss';

const PostRepost = ({visible, hideModal, showModal}) => {
    return (
        <Modal
            className='postRepost'
            visible={visible}
            onCancel={hideModal}>

        </Modal>
    )
}

export default PostRepost;