import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';

import 'swiper/css/bundle';
import './MainSlider.scss';

import slideImg1 from '../../img/main_banner-1.png';
import slideImg2 from '../../img/main_banner-2.png';


const MainSlider = () => {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            className='mainSlider'
            autoplay={{delay: 3000}}
            effect={'fade'}
            fadeEffect={{crossFade: true}}
            speed={3000}
            // loop={true}
            >
            <SwiperSlide className='mainSlider__slide'>
                <img src={slideImg1} alt="" />
            </SwiperSlide>
            <SwiperSlide className='mainSlider__slide'>
                <img src={slideImg2} alt="" />
            </SwiperSlide>
        </Swiper>
    )
}

export default MainSlider;