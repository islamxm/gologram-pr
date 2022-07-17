import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import authService from "../../../services/authService";
import messages from "../../messages/messages";
import ProfileHeader from "../../profileHeader/ProfileHeader";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
import './Post.scss';
import { Modal, Dropdown, Avatar, Spin } from "antd";
import { Swiper, SwiperSlide,  } from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import { useState } from "react";
import { LeftOutlined, 
        RightOutlined,
        MoreOutlined, 
        MessageOutlined, 
        HeartOutlined, 
        HeartFilled, 
        SendOutlined,
        SmileOutlined ,
        LoadingOutlined,
        CloseOutlined  } from '@ant-design/icons';
import {BsBookmark, BsFillBookmarkFill} from 'react-icons/bs';
import useModal from '../../../hooks/useModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EmojiList from "../../emojiList/EmojiList";
import useUserData from "../../../hooks/useUserData";

const service = new authService();




const Post = () => {
    const userData = useAuth();
    const {postId} = useParams();
    const {visible, hideModal, showModal} = useModal();
    const [postData, setPostData] = useState(null);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [reply, setReply] = useState(false);

    //new hook main user states
    const {userId,
           setUserId,
           } = useUserData()
        
    const navigate = useNavigate();



    // GET USER INFO
    useEffect(() => {
        userData.setGlobalReqLoad(false);
        service.getProfileAdvanced(userData.token).then(res => {
            if(res.response.code === 200) {
                setUserId(res.data.id);
            } else {
                messages.error('Произошла ошибка')
            }
        }).catch(err => {
            console.log(err);
        })    
    }, [])



    // GET POST INFO
    useEffect(() => {
        console.log(userId, postId)
        if(postId && userId) {
            const data = {
                user_id: userId,
                post_id: Number(postId)
            }
            service.pullPost(userData.token, data).then(res => {
                if(res.response.code === 200) {
                    setPostData(res.data);
                    setCommentList(res.data.commentaries);
                    setLikesCount(res.data.likes.length);
                } else {
                    messages.error('Произошла ошибка')
                }
            }).catch(err => {
                console.log(err);
            }) 
        }
        
    }, [userId, postId, userData.token])


    // ОТКЛЮЧЕНИЕ КНОПКИ СОЗДАНИЯ КОММЕНТА ЕСЛИ ИНПУТ ПУСТОЙ
    useEffect(() => {
        if(comment === '') {
            setBtnDisabled(true);
        }
    }, [comment])

    


    // ОБНОВЛЕНИЕ СПИСКА КОММЕНТОВ ПОСЛЕ ДОБАВЛЕНИЯ НОВОГО
    const updateCommentList = () => {
        if(postId && userId) {
            const data = {
                user_id: userId,
                post_id: Number(postId)
            }
            service.pullPost(userData.token, data).then(res => {
                if(res.response.code === 200) {
                    setCommentList(res.data.commentaries);
                    
                } else {
                    messages.error('Не удалось обновить комментарии')
                }
            }).catch(err => {
                console.log(err);
            }) 
        }
    }

    // ОБРАБОТЧИК ПЕЧАТАНИЯ КОММЕНТА
    const handleCommentText = (e) => {
        setComment(e.target.value)
        if(e.target.value !== '') {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }


    // ФОКУС НА ИНПУТ ПОСЛЕ НАЖАТИЯ КНОПКИ КОММЕНТА
    const commentTextareaRef = useRef();
    const handleCommentFocus = () => {
        commentTextareaRef.current.focus()
    }

    
    // ДОБАВЛЕНИЕ КОММЕНТА
    const handleAddComment = () => {
        if(comment !== '' && !reply) {
            const data = {
                post_id: Number(postId),
                text: comment
            }
            service.addComment(userData.token, data).then(res => {
                setBtnLoading(true)
                if(res.response.code === 200) {
                    setComment('');
                    setBtnLoading(false)
                    updateCommentList()
                    
                } else {
                    setComment('');
                    setBtnLoading(false)
                }
                
            }).catch(err => {
                setBtnLoading(false)
                messages.error('Не удалось создать комментарий, попробуйте позже')
                setComment('');
                
            })
        } else {
            setBtnDisabled(true);
        }
    }

    
    
    
    // ПОСТАВИТЬ ИЛИ УБРАТЬ ЛАЙК
    const handleAddPostLike = () => {
        if(!liked) {
            const data = {
                post_id: postId,
                action: 'like'
            }
            service.postLikeAction(userData.token, data).then(res => {
                if(res.response.code === 200) {
                    setLiked(true)
                    setLikesCount((currentState) => {
                        return currentState + 1
                    })
                }
            }).catch(err => {
                messages.error('Не удалось поставить лайк, повторите позже')
            })
        }
        if(liked) {
            const data = {
                post_id: postId,
                action: 'unlike'
            }
            service.postLikeAction(userData.token, data).then(res => {
                if(res.response.code === 200) {
                    setLiked(false)
                    setLikesCount((currentState) => {
                        if(currentState >= 1) {
                            return currentState - 1
                        } else {
                            return 0
                        }
                    })
                }
            }).catch(err => {
                messages.error('Не удалось отменить лайк, повторите позже')
            })
        }
    }


    // СОХРАНИТЬ ИЛИ УДАЛИТЬ ПОСТ ИЗ СОХРАНЕННЫХ
    const handleSavePost = () => {
        const data = {
            post_id: postId
        }

        service.savePost(userData.token, data).then(res => {
            if(res.response.code === 200) {
                setSaved(true);
            } else {
                messages.error('Не удалось сохранить публикацию, повторите позже');
            }
        }).catch(err => {
            console.log(err)
            messages.error('Не удалось сохранить публикацию, повторите позже');
        })
        
    }


    // ДОБАВИТЬ ОТМЕТКУ ЮЗЕРУ КОТОРОМУ ОТВЕЧАЕМ
    const handleCommentReply = (username) => {
        const appeal = `@${username}`;
        setComment(appeal);
    }


    // УДАЛЕНИЕ ПОСТА
    const deletePost = () => {
        const data = {
            post_id: postId
        }
        service.deletePost(userData.token, data).then(res => {
            if(res.response.code === 200) {
                messages.success('Публикация успешно удалена');
                navigate('/profile-self', {replace: true})
            } else {
                messages.error('Не удалось удалить публикацию')
            }
        })
    }





    

    // ДОБАВЛЕНИЕ ЭМОДЗИ К ТЕКСТУ КОММЕНТА
    const handleEmoji = (emoji) => {
        setComment((state) => {
            return state + emoji
        })
        setReply(true)
    }


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
                                                <Avatar className="post__action_head_main_prf_avatar"
                                                    src={postData.creater.avatar}
                                                    size={50} alt={'User Avatar'}/>
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

                                    <button
                                        onClick={() => navigate('/profile-self', {replace: false})}
                                        className="post__action_head_opt_btn post__action_head_opt_btn-close">
                                        <CloseOutlined />
                                    </button>
                                    <Modal centered visible={visible} onCancel={hideModal} className="modalMenu">
                                        <ul className="modalMenu__list">
                                            <li className="modalMenu__item modalMenu__item-danger modalMenu__item-bold" onClick={deletePost}>Удалить публикацию</li>
                                            <li className="modalMenu__item">Какой-то пункт</li>
                                            <li className="modalMenu__item">Еще какой-то пункт</li>
                                            <li className="modalMenu__item modalMenu__item-bold" onClick={hideModal}>Отмена</li>
                                        </ul>
                                    </Modal>
                                </div>
                            </div>


                            <div className="post__action_body">
                                <div className="post__action_body_main">
                                    <Avatar
                                        className="post__action_body_main_avatar"
                                        src={postData.creater.avatar}
                                        size={50}
                                        alt={'User avatar'}/>
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
                                <div className="post__action_body_cmts">
                                    {
                                        commentList.length > 0 ? (
                                            commentList.map((comment, index) => (
                                                <div className="post__action_body_cmts_item">
                                                    <Avatar 
                                                        className="post__action_body_cmts_item_avatar"
                                                        src={comment.creater.avatar}
                                                        size={50}
                                                        alt={'User avatar'}/>
                                                    <div className="post__action_body_cmts_item_content">
                                                        <span className="post__action_body_cmts_item_content_username">{comment.creater.username}</span>
                                                        <span className="post__action_body_cmts_item_content_text">
                                                            {comment.text}
                                                        </span>
                                                        <div className="post__action_body_cmts_item_content_ex">
                                                            <div className="post__action_body_cmts_item_content_ex_tm">
                                                                время публ. коммента
                                                            </div>
                                                            <div onClick={(username) => handleCommentReply(comment.creater.username)} className="post__action_body_cmts_item_content_ex_answer">Ответить</div>
                                                        </div>
                                                        {
                                                            
                                                        }
                                                        <div className="post__action_body_cmts_item_content_answers">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                    
                                </div>
                            </div>
                            
                            <div className="post__action_bottom">
                                <div className="post__action_bottom_intf">
                                    <div className="post__action_bottom_intf_btns">
                                        <div className="post__action_bottom_intf_btns_main">
                                            <button onClick={handleAddPostLike} className={"post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-like " + (liked ? 'active' : '')}>
                                                {liked ? <HeartFilled/> : <HeartOutlined />}
                                                
                                            </button>
                                            <button onClick={handleCommentFocus} className="post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-comment">
                                                <MessageOutlined />
                                            </button>
                                            <button className={"post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-repost "}>
                                                <SendOutlined />
                                            </button>
                                        </div>
                                        <div className="post__action_bottom_intf_btns_ex">
                                            <button onClick={handleSavePost} className={"post__action_bottom_intf_btns_item post__action_bottom_intf_btns_item-save " + (saved ? 'active' : '')}>
                                            
                                            {saved ? <BsFillBookmarkFill/> : <BsBookmark/>}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="post__action_bottom_intf_lks">
                                        {likesCount} отметок "Нравится"
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
                                        
                                        <textarea ref={commentTextareaRef} value={comment} onChange={(e) => handleCommentText(e)} rows={1} placeholder="Добавьте комментарий"></textarea>
                                    </div>
                                    <button className={"post__action_bottom_cmt_submit " + (btnDisabled || btnLoading ? 'disabled' : '')} onClick={handleAddComment}>
                                        {btnLoading ? <Spin indicator={<LoadingOutlined style={{color: '#fff'}}/>}/> : 'Отправить'}
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