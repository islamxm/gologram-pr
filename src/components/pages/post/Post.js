import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import authService from "../../../services/authService";
import messages from "../../messages/messages";
import ProfileHeader from "../../profileHeader/ProfileHeader";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
import './Post.scss';
import { Modal, Dropdown } from "antd";
import { Swiper, SwiperSlide,  } from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import { useState } from "react";
import { LeftOutlined, 
        RightOutlined,
        MoreOutlined, 
        MessageOutlined, 
        HeartOutlined, 
        HeartFilled, 
        MessageFilled, 
        SendOutlined,
        SmileOutlined  } from '@ant-design/icons';
import {BsBookmark} from 'react-icons/bs';
import useModal from '../../../hooks/useModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EmojiList from "../../emojiList/EmojiList";

const service = new authService();




const Post = () => {
    const userData = useAuth();
    const {postId} = useParams();
    const {visible, hideModal, showModal} = useModal();
    const [postData, setPostData] = useState(null);
    const [comment, setComment] = useState('');

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const handleEmoji = (emoji) => {
        setComment((state) => {
            return state + emoji
        })
    }

    useEffect(() => {
        userData.setGlobalReqLoad(false);
        service.getProfileAdvanced(userData.token).then(res => {
            
            if(res.response.code === 200) {

                const data = {
                    user_id: res.data.id,
                    post_id: postId
                }
                
                service.pullPost(userData.token, data).then(res => {
                    if(res.response.code === 200) {
                        setPostData(res.data);
                    } else {
                        messages.error('Произошла ошибка')
                    }
                })
            } else {
                messages.error('Произошла ошибка')
            }
            
        })    
    }, [])



    return (
        <>
            <ProfileHeader/>
            {postData ? (
                <div className="post">
                <div className="container">
                    <div className="post__in">
                        <div className="post__media">
                            <Swiper
                                slidesPerView={1}
                                modules={[Navigation, Pagination]}
                                navigation={{prevEl: '.post__media_nav-prev', nextEl: '.post__media_nav-next'}}
                                pagination={{el: '.post__media_pag', type: 'bullets', bulletClass: 'post__media_pag_item', bulletActiveClass: 'active'}}>
                                {
                                    postData ? postData.attachments.map((media, index) => (
                                        <SwiperSlide className="post__media_item">
                                            <img src={media.file} alt={media.file} key={index} />
                                        </SwiperSlide>
                                    )) : null
                                }
                                <div className="post__media_pag"></div>
                                <div className="post__media_nav post__media_nav-prev">
                                <LeftOutlined />
                                </div>
                                <div className="post__media_nav post__media_nav-next">
                                <RightOutlined />
                                </div>
                            </Swiper>
                        </div>
                        <div className="post__action">
                            <div className="post__action_head">
                                <div className="post__action_head_main">
                                    
                                    {
                                        postData ? (
                                            <Link to={`/${postData.creater.username}`}>
                                            <div className="post__action_head_main_prf">
                                                <div className="post__action_head_main_prf_avatar">
                                                    <img src={postData.creater.avatar} alt={postData.creater.avatar} />
                                                </div>
                                                <div className="post__action_head_main_prf_username">{postData.creater.username}</div>
                                            </div>
                                            </Link>
                                        ) : null
                                    }
                                    <div className="post__action_head_main_status"></div>
                                </div>
                                <div className="post__action_head_opt">
                                    <button onClick={showModal} className="post__action_head_opt_btn">
                                        <MoreOutlined />
                                    </button>
                                    <Modal centered visible={visible} onCancel={hideModal} className="modalMenu">
                                        <ul className="modalMenu__list">
                                            <li className="modalMenu__item modalMenu__item-danger modalMenu__item-bold">Удалить публикацию</li>
                                            <li className="modalMenu__item">Какой-то пункт</li>
                                            <li className="modalMenu__item">Еще какой-то пункт</li>
                                            <li className="modalMenu__item modalMenu__item-bold" onClick={hideModal}>Отмена</li>
                                        </ul>
                                    </Modal>
                                </div>
                            </div>


                            <div className="post__action_body">
                                <div className="post__action_body_main">
                                    <div className="post__action_body_main_avatar">
                                        <img src={postData.creater.avatar} alt={postData.creater.avatar}/>
                                    </div>
                                    <div className="post__action_body_main_content">
                                        <div className="post__action_body_main_content_description">
                                            <span className="post__action_body_main_content_description_username">{postData.creater.username}</span>
                                            <span className="post__action_body_main_content_description_text">{postData.text}</span>
                                        </div>
                                        <div className="post__action_body_main_content_ex">
                                            <Moment date={postData.date_public} fromNow/>
                                               
                                           
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="post__action_body_cmts"></div>
                            </div>
                            
                            <div className="post__action_bottom">
                                <div className="post__action_bottom_intf">
                                    <div className="post__action_bottom_intf_btns">
                                        <div className="post__action_bottom_intf_btns_main">
                                            <button className="post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-like">
                                                <HeartOutlined />
                                                
                                            </button>
                                            <button className="post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-comment">
                                                <MessageOutlined />
                                            </button>
                                            <button className="post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-repost">
                                                <SendOutlined />
                                            </button>
                                        </div>
                                        <div className="post__action_bottom_intf_btns_ex">
                                            <button className="post__action_bottom_intf_btns_item">
                                            <BsBookmark/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="post__action_bottom_intf_lks">
                                        {postData.likes.length} отметок "Нравится"
                                    </div>
                                    <div className="post__action_bottom_intf_tm">
                                        <Moment date={postData.date_public} fromNow/>
                                    </div>
                                </div>
                                <div className="post__action_bottom_cmt">
                                    
                                    
                                    <Dropdown 
                                        overlay={<EmojiList handleEmoji={handleEmoji}/>} 
                                        trigger={['click']} 
                                        placement={'topLeft'}>
                                        <button className="post__action_bottom_cmt_emz">
                                            <SmileOutlined />
                                        </button>
                                    </Dropdown>

                                    <div className="post__action_bottom_cmt_text">
                                        <textarea value={comment} onChange={(e) => handleComment(e)} rows={1} placeholder="Добавьте комментарий"></textarea>
                                    </div>
                                    <button className="post__action_bottom_cmt_submit">
                                        Отправить
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            ) : null}
            
        </>
    )
} 

export default Post;