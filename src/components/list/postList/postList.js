import './postList.scss';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {
    CameraOutlined,
    CopyFilled,
    HeartFilled,
    MessageFilled
  } from '@ant-design/icons';
import authSevice from '../../../services/authService';
import useAuth from '../../../hooks/useAuth';
import messages from '../../messages/messages';

const service = new authSevice();


const EmptyPost = () => {

    return (
        <div className="emptyPost">
            <div className="emptyPost__wrapper">
                <CameraOutlined/>
                <div className="emptyPost__text">Нет публикаций</div>
            </div>
        </div>
    )
}

const PostList = () => {
    const {token, postsCount} = useAuth();
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        service.getProfileAdvanced(token).then(res => {
            if(res.response.code === 200) {
                service.pullPosts(token, {user_id: res.data.id}).then(res => {
                    let psts = [];
                    if(res.response.code === 200) {
                        psts = res.data.filter(post => {
                            if(post.is_deleted === false) {
                                return post
                            }
                        }).reverse();
                        console.log(psts)
                        setPosts(psts);
                        
                    } else {
                        messages.error('Произошла ошибка')
                    }
                })
            } else {
                console.log('error');
            }
        })
    }, [postsCount])


    return (
        
            posts.length > 0 ? (
                <div className="postList">
                    <div className="postList__in">
                        {
                        
                            posts.map(post => (
                                <div className="postList__item" key={post.id}>
                                    {post.attachments.length > 1 ? (
                                        <div className="postList__item_cnt">
                                            <CopyFilled />
                                        </div>
                                    ) : null} 
                                    <Link to={`/${post.id}`}>
                                        <div className="postList__item_info">
                                            {/* <div className="postList__item_thmb">
                                                <button className="postList__item_thmb_btn">
                                                    предпросмотр
                                                </button>
                                            </div> */}
                                            <div className="postList__item_info_item postList__item_info_item-likes">
                                                <div className="postList__item_info_item_icon">
                                                    <HeartFilled />
                                                </div>
                                                <div className="postList__item_info_item_value">
                                                    {post.likes.length}
                                                </div>
                                            </div>
                                            <div className="postList__item_info_item postList__item_info_item-comments">
                                                <div className="postList__item_info_item_icon">
                                                    <MessageFilled />
                                                </div>
                                                <div className="postList__item_info_item_value">
                                                    {post.commentaries.length}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    
                                    <div className="postList__item_prev">
                                        <img src={post.attachments[0].file} alt="" />
                                    </div>
                                </div>
                            ))
                        
                        }
                    
                    </div>
                </div>
            ) : (
                <EmptyPost/>
            )
        
    )
}
export default PostList;