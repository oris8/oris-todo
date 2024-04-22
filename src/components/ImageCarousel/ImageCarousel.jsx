import React from "react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import "./ImageCarousel.css";

import MOCK_POST_IMAGE from "../../assets/mock_post.jpeg";
import MOCK_POST_IMAGE2 from "../../assets/mock_post2.jpeg";

const mock = [MOCK_POST_IMAGE, MOCK_POST_IMAGE2];

const ImageCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.length === 0
            ? mock.map((src, idx) => (
                <div className="embla__slide" key={idx}>
                  <img src={src} alt="image" />
                </div>
              ))
            : { slides }.map((src, idx) => (
                <div className="embla__slide" key={idx}>
                  <img src={src} alt="image" />
                </div>
              ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
