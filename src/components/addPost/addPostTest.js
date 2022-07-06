// import ImageFilter from 'react-image-filter';
import './addPost.scss';
import useAuth from '../../hooks/useAuth';
import {Modal, Slider } from 'antd';
import Cropper from 'react-easy-crop';
import {
    PictureOutlined
  } from '@ant-design/icons';
import { getCroppedImg, urltoFile } from '../changeAvatar/canvasUtils';
import { useState, useEffect, useCallback } from 'react';
import authService from '../../services/authService';
import messages from '../messages/messages';
import CropDialog from './cropDialog';
import Button from '../button/Button';
const service = new authService();


function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result);
    })
}

const AddPostasdsa = ({isVis}) => {
    const {token, setGlobalReqLoad, setGlobalAvatar, avatar} = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [aspect, setAspect] = useState(1/1);
    const [step, setStep] = useState(1);
    const [upl, setUpl] = useState(false);
    const [images, setImages] = useState([]);
    const [test, setTest] = useState([]);

    
    const handleAspect = (value) => {
        setAspect(value);
    }

    const handleZoom = (value) => {
        setZoom(value);
    }

    // const onClose = useCallback(() => {
    //     setImageSrc(null);
    //     // setIsModalVisible(false); 
    // }, [])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        // onClose();
        try {
          const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            ''
          )
          setCroppedImage(croppedImage);
          urltoFile(croppedImage, 'meme.png', 'image/png').then(function(file){
            // const data = new FormData();
            // data.append('avatar', file);
            // service.changeAvatar(token, data).then(res => {
            //     setGlobalReqLoad(true);
            //     if(res && res.response.code === 200 && res.response.status === 'successfully') {
            //         setGlobalAvatar(res.input_data.avatar);
            //         setGlobalReqLoad(false);
            //         messages.success();
            //     } else {
            //         console.log(res.response.code);
            //         setGlobalReqLoad(false);
            //         messages.error();
            //     }
                
            // })
          })
        } catch (e) {
          console.error(e)
        }
    }, [imageSrc, croppedAreaPixels])


    const onFileChange = (e) => {
        let newFiles = [];
        if (e.target.files && e.target.files.length > 0) {
            let files = [...e.target.files];
        
            files.map((file, index) => {
                readFile(file).then(res => {
                    newFiles[index] = {
                        src: res,
                        id: index
                    };
                })
            })
        } 

        setImages(newFiles);
        
    }

    useEffect(() => {
        setTimeout(() => {
            console.log(images)
        }, 10);

    }, [images]) 
    

    

    const headFunc = (step) => {
        switch(step) {
            case 1:
                return 'Создать пость'
            case 2:
                return 'Обрезать'
            case 3: 
                return 'Редактировать'
            default:
                return 'Ошибка'
        }
    }

    const stepBack = (step) => {
        if(step === 2) {
            setImageSrc(null);
            setStep(1);
            setImages([]);
            
        }
        if(step === 3) {
            setStep(2);
            setCroppedImage(null);
            setAspect(1/1);
        }   
    }
    
    const stepNext = (step) => {
        console.log(`current step: ${step}`)
        if(step === 2) {
            console.log('step next')
            setStep(3);
            // showCroppedImage();
        }
    }

    const  filterChange = async (filter) => {
        const img = await getCroppedImg(
            imageSrc, 
            croppedAreaPixels,
            filter
        )
        setCroppedImage(img);
    }

    
    const [selectedImg, setSelectedImg] = useState(null);

    return (

        <Modal width={700} className='addPost' visible={isVis}>
            <div className="addPost__in">
                <div className="addPost__head">
                    {headFunc(step)}
                </div>

                <div className="addPost__body">
                    {images.length > 1 ? (
                        
                        // <div className="addPost__editor">
                        //     {images.length > 0 ? (
                        //         images.map(image => {
                        //             return (
                        //                 <>
                        //                     <img src={image.imageUrl} alt=''/>
                        //                 </>
                                        
                        //             )
                        //         })
                        //         // <div className="addPost__editor_prev">
                                    
                        //         //     <img src={croppedImage} alt="" />
                        //         // </div>
                        //     ) : (
                        //         <input type="file" multiple accept='image/*' onChange={onFileChange}/>
                        //         // <CropDialog
                        //         //     id={selectedImg.id}
                        //         //     imageUrl={selectedImg.imageUrl}
                        //         //     cropInit={selectedImg.crop}
                        //         //     zoomInit={selectedImg.zoom}
                        //         //     aspectInit={selectedImg.aspect}
                        //         // />
                                
                                
                        //         // Image Crop Dialog
                        //         // <div className="addPost__editor_crop">
                        //         //     <div className="addPost__editor_main">

                        //         //         <div className="cropper-container" style={{position: 'relative'}}>
                        //         //             <Cropper
                        //         //                 image={imageSrc}
                        //         //                 crop={crop}
                        //         //                 zoom={zoom}
                        //         //                 aspect={aspect}
                        //         //                 showGrid={true}
                        //         //                 onCropChange={setCrop}
                        //         //                 onCropComplete={onCropComplete}
                        //         //                 onZoomChange={setZoom}
                        //         //                 zoomWithScroll={false}
                        //         //             />
                        //         //         </div>
                        //         //     </div>
                        //         //     <div className="addPost__editor_set">
                        //         //         <div className="addPost__editor_set_item addPost__editor_set_item-aspect">
                        //         //             <div className="addPost__editor_set_item_name">Соотношение сторон</div>
                        //         //             <div className="addPost__editor_set_item_body">
                        //         //                 <div className="addPost__editor_set_item_body_aspect">
                        //         //                     <input
                        //         //                         onChange={(e) => handleAspect(e.target.value)} 
                        //         //                         value={1/1} 
                        //         //                         id='1aspect' 
                        //         //                         type="radio" 
                        //         //                         name='aspect'/>
                        //         //                     <label className='addPost__editor_set_item_body_aspect_label' htmlFor="1aspect">
                        //         //                         1:1
                        //         //                     </label>
                        //         //                 </div>
                        //         //                 <div className="addPost__editor_set_item_body_aspect">
                        //         //                     <input
                        //         //                         onChange={(e) => handleAspect(e.target.value)} 
                        //         //                         value={4/5} 
                        //         //                         id='2aspect' 
                        //         //                         type="radio" 
                        //         //                         name='aspect'/>
                        //         //                     <label className='addPost__editor_set_item_body_aspect_label' htmlFor="2aspect">
                        //         //                         4:5
                        //         //                     </label>
                        //         //                 </div>
                        //         //                 <div className="addPost__editor_set_item_body_aspect">
                        //         //                     <input
                        //         //                         onChange={(e) => handleAspect(e.target.value)}
                        //         //                         value={16/9} 
                        //         //                         id='3aspect' 
                        //         //                         type="radio" 
                        //         //                         name='aspect'/>
                        //         //                     <label className='addPost__editor_set_item_body_aspect_label' htmlFor="3aspect">
                        //         //                         16:9
                        //         //                     </label>
                        //         //                 </div>
                        //         //                 {/* <Radio.Group onChange={(e) => handleAspect(e.target.value)} defaultValue={1/1}>
                        //         //                     <Radio
                        //         //                         value={1/1}>
                        //         //                         1:1
                        //         //                     </Radio>
                        //         //                     <Radio
                        //         //                         value={4/5}>
                        //         //                         4:5
                        //         //                     </Radio>
                        //         //                     <Radio
                        //         //                         value={16/9}>
                        //         //                         16:9
                        //         //                     </Radio>
                        //         //                 </Radio.Group> */}
                        //         //             </div>
                        //         //         </div>
                        //         //         <div className="addPost__editor_set_item">
                        //         //             <div className="addPost__editor_set_item_name">Масштаб</div>
                        //         //             <div className="addPost__editor_set_item_body">
                        //         //                 <Slider
                        //         //                     value={zoom}
                        //         //                     min={1}
                        //         //                     max={10}
                        //         //                     step={0.001}
                        //         //                     tooltipPlacement={'top'}
                        //         //                     onChange={(e) => handleZoom(e)}
                        //         //                     trackStyle={{background: 'black'}}
                        //         //                     handleStyle={{background: 'black', borderColor: 'black', boxShadow: 'unset' }}/>
                        //         //             </div>
                        //         //         </div>
                                        
                        //         //     </div>    
                        //         // </div> 
                        //     )}
                            
                            
                            
                        // </div>
                        <div className="addPost__editor">
                            {/* {
                                images.map(item => {
                                    console.log('as');
                                    return (
                                        <img src={item.imageUrl} key={item.id}/>
                                    )
                                })
                            } */}
                            <div className="addPost__editor_test">
                                {
                                    images.map((image, index) => {
                                        return (
                                            <div className="addPost__editor_test_item" key={image.id}>
                                                <img src={image.src} alt="" />
                                            </div>
                                        )
                                        
                                    })
                                }
                                
                            </div>
                            
                        </div>
                        
                    ) : (
                        <div className="addPost__upload">
                            <input id='postFile' type="file" onChange={onFileChange} accept="image/*" multiple/>
                            <label className='addPost__upload_label' htmlFor="postFile">
                                <div className="addPost__upload_label_icon">
                                    <PictureOutlined />
                                </div>
                                <div className="addPost__upload_label_text">Загрузить с устройства</div>
                            </label>
                            
                        </div>
                    )}
                    <div className={"addPost__filter " + (step === 3 ? 'active' : '')}>
                        <div className="addPost__filter_list custom-scroll">
                            <button onClick={() => filterChange('')} className="addPost__filter_btn addPost__filter_btn-original">
                                <div className="addPost__filter_btn_img">
                                    <img src={imageSrc} alt="" />
                                </div>
                                <div className="addPost__filter_btn_name">Original</div>
                            </button>
                            <button onClick={() => filterChange('grayscale(100%)')} className="addPost__filter_btn addPost__filter_btn-grayscale">
                                <div className="addPost__filter_btn_img">
                                    <img src={imageSrc} alt="" />
                                </div>
                                <div className="addPost__filter_btn_name">B/W</div>
                            </button>
                            <button onClick={() => filterChange('invert(100%)')} className="addPost__filter_btn addPost__filter_btn-invert">
                                <div className="addPost__filter_btn_img">
                                    <img src={imageSrc} alt="" />
                                </div>
                                <div className="addPost__filter_btn_name">Invert</div>
                            </button>
                            <button onClick={() => filterChange('sepia(100%)')} className="addPost__filter_btn addPost__filter_btn-sepia">
                                <div className="addPost__filter_btn_img">
                                    <img src={imageSrc} alt="" />
                                </div>
                                <div className="addPost__filter_btn_name">Sepia</div>
                            </button>
                            
                        </div>
                    </div>
                </div>

                
                
                <div className={"addPost__foot " + (step === 1 ? null : 'active')}>
                    <div className="addPost__foot_item">
                        <Button onClickHandle={() => stepBack(step)} classList={'button__orange'} buttonText={'Назад'}></Button>
                    </div>
                    <div className="addPost__foot_item">
                        <Button onClickHandle={() => stepNext(step)} classList={'button__orange'} buttonText={'Далее'}></Button>
                    </div>
                </div>
                
                
            </div>
        </Modal>
        
        
        
    )
} 

export default AddPostasdsa;