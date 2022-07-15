// import ImageFilter from 'react-image-filter';
import './addPost.scss';
import {Modal, Input } from 'antd';
import {
    PictureOutlined
  } from '@ant-design/icons';
import { urltoFile } from '../changeAvatar/canvasUtils';
import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import CropDialog from './cropDialog';
import Button from '../button/Button';
import useAuth from '../../hooks/useAuth';
import messages from '../messages/messages';
import {LeftOutlined, RightOutlined, EditOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import {Navigation, EffectFade} from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

const service = new authService();

// function readFile(file) {
//     return new Promise((resolve, reject) => {
//       let reader = new FileReader()
//       reader.onerror = reject;
//       reader.onload = function () {
//         resolve(reader.result)
//       }
//       reader.readAsDataURL(file)
//     })
// }

const AddPost = ({isVis, onCancel}) => {

    const [step, setStep] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null)
    const {setGlobalReqLoad, avatar, token, setGlobalPosts, posts} = useAuth();
    const [username, setUsername] = useState(null)
    const [postIds, setPostIds] = useState([]);
    const [descr, setDescr] = useState('');
    


    useEffect(() => {
        service.getProfileAdvanced(token).then(({data}) => {
            setUsername(data.username);
        })
    }, [])

    useEffect(() => {
        if(images.length > 0) {
            setGlobalReqLoad(false)
        } else {
            return;
        }
    }, [images])

    useEffect(() => {
        if(isVis === false) {
            setSelectedImg(null);
            setImages([]);
            setStep(1);
            setDescr('');
        }
    }, [isVis])



    const stepBack = (step) => {
        if(step === 2) {
            setStep(1);
            setImages([])
        }
        if(step === 3) {
            setStep(2);
        }   
    }
    
    const stepNext = async (step) => {
        if(step === 2) {
            setStep(3);
        }
        if(step === 3) {
            console.log(images);
            addFilesToStorage(images);
        }
    }


    const onFileChange = (e) => { 
        if(e.target.files.length > 5) {
            messages.error('Максимально допустимое количество файлов - 5');
            return;
        } else {
            let newFiles = [];
            let files = [...e.target.files];

            files.map((file, index) =>  {
                return newFiles.push({
                    src: URL.createObjectURL(file),
                    id: index,
                    croppedImageUrl: null,
                    filter: ''
                })
            })
            setGlobalReqLoad(true);
            setImages(newFiles);
            setStep(2);
        }

    }

    const setCroppedImageFor = (id, crop, zoom, aspect, filter, croppedImageUrl) => {
        const newImagesList = [...images];
        const imageIndex = images.findIndex(x => x.id === id);
        const image = images[imageIndex];
        const newImage = {...image, croppedImageUrl, crop, zoom, aspect, filter}
        newImagesList[imageIndex] = newImage;
        setImages(newImagesList);
        setSelectedImg(null);
    } 

    const headFunc = () => {
        switch(step) {
            case 1:
                return 'Выбрать изображение'
                
            case 2: 
                return 'Редактировать'
            case 3:
                return 'Создать публикацию'
            default: {
                return;
            }
        }
    }

    const addFilesToStorage = async (files) => {
        let postFiles = [];

        await files.forEach(async (file, index) => {
            await urltoFile(file.src, 'post.png', 'image/png').then(async function(newFile)  {
                const data = new FormData();
                data.append('file', newFile);
                await service.uploadFilesToStorage(token, data).then(async res => {
                    postFiles.push(await res.data.pk)
                })
                setPostIds(postFiles);
                
            })
            
        })
    }

    useEffect(() => {
        setGlobalReqLoad(true)
        setTimeout(() => {
            if(postIds.length > 0) {
                service.createPost(postIds, descr, token).then(res => {
                    
                    if(res.response.code !== 200) {
                        messages.error(`${res.data.validate_errors.text.join()}`)
                        setGlobalReqLoad(false);
                    } else {
                        messages.success('Публикация успешно создана')
                        setGlobalReqLoad(false);
                        onCancel();
                        service.pullPosts(token, {user_id: res.data.creater}).then(res => {
                            if(res.response.code === 200) {
                                setGlobalPosts(res.data.length);
                            }   
                        })
                    }
                    
                })
            }
        }, 2000);
        
    }, [postIds])



    const onDescrChange = (e) => {
        setDescr(e.target.value);
    }
    



    return (

        <Modal onCancel={onCancel} width={1000} className='addPost' visible={isVis}>
            <div className="addPost__in">
                <div className="addPost__head">

                    <div className="addPost__head_name">
                        {headFunc(step)}
                    </div>
                    <div className="addPost__head_btn" onClick={onCancel}>
                        Закрыть
                    </div>
                </div>

                <div className="addPost__body">
                    {images.length > 0 ? (
                        <div className="addPost__editor">
                            <div className="addPost__editor_slider">
                                
                                <Swiper
                                    className='addPost__editor_slider_el'
                                    slidesPerView={1}
                                    modules={[Navigation, EffectFade]}
                                    effect={'fade'}
                                    fadeEffect={{crossFade: true}}
                                    navigation={{prevEl: '.addPost__editor_slider_nav-prev', nextEl: '.addPost__editor_slider_nav-next'}}
                                    >
                                    {selectedImg ? (
                                        <CropDialog
                                            id={selectedImg.id}
                                            imageUrl={selectedImg.src}
                                            cropInit={selectedImg.crop}
                                            zoomInit={selectedImg.zoom}
                                            aspectInit={selectedImg.aspect}
                                            filterInit={selectedImg.filter}
                                            onCancel={onCancel}
                                            setCroppedImageFor={setCroppedImageFor}/>
                                    ) : null}
                                    <div className="addPost__editor_slider_nav addPost__editor_slider_nav-prev">
                                        <LeftOutlined/>
                                    </div>
                                    <div className="addPost__editor_slider_nav addPost__editor_slider_nav-next">
                                        <RightOutlined />
                                    </div>
                                    {images.map((image) => {
                                        

                                        
                                        return (
                                            <SwiperSlide className='addPost__editor_slider_slide' key={image.id}>
                                                
                                                <img 
                                                    id={image.id} 
                                                    src={image.croppedImageUrl ? image.croppedImageUrl : image.src} 
                                                    alt="" />
                                                {
                                                    step !== 3 ? (
                                                        <button className="addPost__editor_slider_slide_edit-btn" onClick={() => setSelectedImg(image)}>
                                                            <div className="addPost__editor_slider_slide_edit-btn_icon"><EditOutlined /></div>
                                                            <div className="addPost__editor_slider_slide_edit-btn_text">Редактировать</div>
                                                        </button>
                                                    ) : null
                                                }
                                            </SwiperSlide>
                                        )
                                    })}

                                </Swiper>
                            </div>
                            <div className={"addPost__editor_side " + (step === 3 ? 'active' : '')}>
                                
                                <div className="addPost__editor_side_in">
                                    <div className="addPost__editor_side_head">
                                        <div className="addPost__editor_side_head_avatar">
                                            <img src={avatar} alt="" />
                                        </div>
                                        <div className="addPost__editor_side_head_username">
                                            {username}
                                        </div>
                                    </div>
                                    <div className="addPost__editor_side_part">
                                        <div className="addPost__editor_side_part_item addPost__editor_side_part_item--description">
                                            <div className="authInput addPost__editor_side_part_item--description_el">
                                                <Input.TextArea 
                                                    value={descr}
                                                    onChange={(e) => onDescrChange(e)}
                                                    placeholder='Придумайте подпись...' 
                                                    maxLength={2200} 
                                                    showCount={true}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="addPost__upload">
                            <input multiple id='postFile' type="file" accept="image/jpeg, image/png, image/webp" onChange={onFileChange}/>
                            <label className='addPost__upload_label' htmlFor="postFile">
                                <div className="addPost__upload_label_icon">
                                    <PictureOutlined />
                                </div>
                                <div className="addPost__upload_label_text">Загрузить с устройства</div>
                            </label>
                            
                        </div>
                    )}
                        
                </div>

                
                
                <div className={"addPost__foot " + (step !== 1 && selectedImg === null ? 'active' : null)}>
                    <div className="addPost__foot_item">
                        <Button onClickHandle={() => stepBack(step)} classList={'button__orange'} buttonText={'Назад'}></Button>
                    </div>
                    <div className="addPost__foot_item">
                        <Button onClickHandle={() => stepNext(step)} classList={'button__orange'} buttonText={step === 3 ? 'Публиковать' : 'Далее'}></Button>
                    </div>
                </div>
                
                
            </div>
        </Modal>
        
        
        
    )
} 

export default AddPost;