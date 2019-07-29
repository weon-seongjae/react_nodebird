import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, Slickwrapper, ImageWrapper, Indicator } from './style';


const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>상세이미지</h1>
        <CloseBtn type="close" onClick={onClose} />
      </Header>
      <Slickwrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map(v => {
              return (
                <ImageWrapper>
                  <img src={`http://localhost:3065/${v.src}`}/>
                </ImageWrapper>
              );
            })}
          </Slick>
            <Indicator style={{ textAlign: 'center' }}>
              <div>
                {currentSlide + 1} / {images.length}
              </div>
            </Indicator>
        </div>
      </Slickwrapper>
    </Overlay>
  );
};


ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
