

import '../styles/my-component.css'
import { useRef, useEffect } from 'react';
// import {Mousewheel} from 'swiper/modules';

// import 'swiper/css/bundle';


export const MyComponent = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('swiperprogress', (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener('swiperslidechange', (e) => {
      // console.log('slide changed');
    });

    return () => {}
  }, []);

  useEffect(() => {
    // const prevButton = swiperElRef.current.shadowRoot
    // .querySelector('.swiper-button-prev')
    // const nextButton = swiperElRef.current.shadowRoot
    // .querySelector('.swiper-button-next')

    // console.log(prevButton, nextButton)
  }, [])

  return (
    <div className='bg-blue-900'>
      <swiper-container
        ref={swiperElRef}
        slides-per-view={1}
        navigation={true}
        pagination={true}
        loop
      >
        <swiper-slide>
          <div className='bg-red-500 h-[100px]'>hello</div>
        </swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>

        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>

      </swiper-container>
    </div>
  );
}