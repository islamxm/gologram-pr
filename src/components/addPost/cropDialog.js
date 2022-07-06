import './cropDialog.scss';
import Cropper from 'react-easy-crop';
import { useState } from 'react';
import { Radio, Tabs, Slider} from 'antd';
import Button from '../button/Button';
import { getCroppedImg, urltoFile } from '../changeAvatar/canvasUtils';
import { CloseCircleOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import filterPlc from '../../img/filter-plc.jpg';
const {TabPane} = Tabs;

const aspectRatio = [
    {value: 1/1, text: '1/1'},
    {value: 4/5, text: '4/5'},
    {value: 16/9, text: '16/9'}
]


const filters = [
    {value: '', text: 'Оригинал'},
    {value: 'grayscale(100%)', text: 'Ч/Б'},
    {value: 'sepia(100%)', text: 'Сепия'},
]

const CropDialog = ({
    id, 
    imageUrl, 
    cropInit, 
    zoomInit, 
    aspectInit,
    filterInit,
    onCancel,
    setCroppedImageFor}) => {

    if(zoomInit == null) {
        zoomInit = 1;
    }

    if(cropInit == null) {
        cropInit = {x: 0, y: 0}
    }

    if(aspectInit == null) {
        aspectInit = aspectRatio[0]
    }

    if(filterInit == null) {
        filterInit = filters[1].value;
    }

    const {setGlobalReqLoad} = useAuth();

    const [zoom, setZoom] = useState(zoomInit);
    const [crop, setCrop] = useState(cropInit);
    const [aspect, setAspect] = useState(aspectInit);
    const [filter, setFilter] = useState(filterInit);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatio.find(ratio => ratio.value == value);
        setAspect(ratio);
    }

    const onFilterChange = (filter) => {
        setFilter(filter)
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    } 

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels, filter)
        setCroppedImageFor(id, crop, zoom, aspect, filter, croppedImageUrl);
    }

    const cancelCrop = () => {
        setCroppedImageFor(null);
    }

    
        
    return (

        <div className="cropDialog">
            <div className="cropDialog__in">
                <div className="cropDialog__main">
                    <div className="cropDialog__body">
                        <div className="crop-container" style={{position: 'relative', filter: `${filter}`}}>
                            <Cropper
                                image={imageUrl}
                                zoom={zoom}
                                crop={crop}
                                showGrid={true}
                                aspect={aspect.value}
                                onCropChange={onCropChange}
                                onZoomChange={onZoomChange}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="cropDialog__action"  >
                            <button onClick={cancelCrop} className="cropDialog__action_btn cropDialog__action_btn--cancel">
                                <div className="cropDialog__action_btn_icon">
                                    <CloseOutlined />        
                                </div>
                                <div className="cropDialog__action_btn_text">
                                    Отмена
                                </div>
                            </button>
                            <button onClick={onCrop} className="cropDialog__action_btn cropDialog__action_btn--save">
                                <div className="cropDialog__action_btn_icon">
                                    <CheckOutlined />     
                                </div>
                                <div className="cropDialog__action_btn_text">
                                    Сохранить
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="cropDialog__controls active">
                        <Tabs tabBarStyle={{color: 'black'}} defaultActiveKey='1'>
                            <TabPane tab={'Обрезать'} key='1'>
                                <div className="cropDialog__controls_body">
                                    <div className="cropDialog__controls_body_in">
                                        <div className="cropDialog__controls_body_item">
                                            <div className="cropDialog__controls_body_item_name">
                                                Масштаб
                                            </div>
                                            <div className="cropDialog__controls_body_item_el">
                                                <Slider 
                                                    step={0.01}
                                                    defaultValue={zoom}
                                                    value={zoom}
                                                    min={1}
                                                    max={3}
                                                    tooltipVisible={false}
                                                    onChange={onZoomChange}
                                                    trackStyle={{backgroundColor: 'black'}}
                                                    handleStyle={{backgroundColor: 'black',overflow: 'visible', border: 'none'}}

                                                    />
                                            </div>
                                            
                                        </div>
                                        <div className="cropDialog__controls_body_item">
                                            <div className="cropDialog__controls_body_item_name">
                                                Соотношение
                                            </div>
                                            <div className="cropDialog__controls_body_item_el">
                                                {
                                                    aspectRatio.map(ratio => (
                                                        <div className="cropDialog__controls_body_item_el_radio">
                                                            <input 
                                                                onChange={(e) => onAspectChange(e)} 
                                                                type="radio" 
                                                                value={ratio.value} 
                                                                name='aspectRatio'
                                                                id={ratio.text}/>
                                                            <label htmlFor={ratio.text} className='cropDialog__controls_body_item_el_radio_label'>
                                                                {ratio.text}
                                                            </label>
                                                        </div>
                                                        
                                                    ))
                                                }
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab={'Фильтры'} key='2'>
                                <div className="cropDialog__controls_body">
                                    <div className="cropDialog__controls_body_in">
                                        <div className="cropDialog__controls_body_filter">
                                            {
                                                filters.map(filter => (
                                                    <div className="cropDialog__controls_body_filter_item" onClick={(e) => onFilterChange(filter.value)}>
                                                        
                                                        <div className="cropDialog__controls_body_filter_item_prev" style={{filter: `${filter.value}`}}>
                                                            <img src={filterPlc} alt=''/>
                                                        </div>

                                                        <div className="cropDialog__controls_body_filter_item_name">
                                                            {filter.text}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </TabPane> 
                            <TabPane tab={'Еще что-то'} key='3'>
                                <div className="cropDialog__controls_body">
                                Если вдруг будут еще какие то настройки касаемо конкретного фото
                                </div>
                                
                            </TabPane> 
                        </Tabs>
                        
                        
                    </div>
                </div>
                
                
                
            </div>
        </div>

    )
}

export default CropDialog;