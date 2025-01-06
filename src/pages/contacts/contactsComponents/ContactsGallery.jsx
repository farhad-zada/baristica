import React, { useState, useEffect } from "react";
import style from "../contactsCss/gallery.module.css";

import img1 from "../../../assets/img/img1.jpeg";
import img2 from "../../../assets/img/img2.jpeg";
import img3 from "../../../assets/img/img3.jpeg";
import img4 from "../../../assets/img/img4.jpeg";
import img5 from "../../../assets/img/img5.jpeg";

const ContactsGallery = () => {
  const [modalImageIndex, setModalImageIndex] = useState(null);

  useEffect(() => {
    if (modalImageIndex !== null) {
      document.body.classList.add(style.no_scroll);
    } else {
      document.body.classList.remove(style.no_scroll);
    }

    return () => document.body.classList.remove(style.no_scroll);
  }, [modalImageIndex]);

  const images = [
    { id: 1, src: img1, alt: "Coffee Shop 1" },
    { id: 2, src: img2, alt: "Coffee Shop 2" },
    { id: 3, src: img3, alt: "Coffee Shop 3" },
    { id: 4, src: img4, alt: "Coffee Shop 4" },
    { id: 5, src: img5, alt: "Coffee Shop 5" },
  ];

  const openModal = (index) => {
    setModalImageIndex(index);
  };

  const closeModal = () => {
    setModalImageIndex(null);
  };

  const showPreviousImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const showNextImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={style.gallery_container}>
      <div className={style.horizontal_gallery}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={style.gallery_item}
            onClick={() => openModal(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={style.gallery_image}
            />
          </div>
        ))}
      </div>

      {modalImageIndex !== null && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>
            <img
              src={images[modalImageIndex].src}
              alt={images[modalImageIndex].alt}
              className={style.modal_image}
            />
          </div>
            <button
              className={style.arrow_left}
              onClick={(e) => {
                e.stopPropagation();
                showPreviousImage();
              }}
            >
              &#8249;
            </button>
            <button
              className={style.arrow_right}
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
            >
              &#8250;
            </button>
        </div>
      )}
    </div>
  );
};

export default ContactsGallery;
