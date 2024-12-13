import React, { useState, useEffect } from "react";
import style from "../contactsCss/gallery.module.css";

import img1 from "../../../assets/img/img1.jpeg";
import img2 from "../../../assets/img/img2.jpeg";
import img3 from "../../../assets/img/img3.jpeg";
import img4 from "../../../assets/img/img4.jpeg";
import img5 from "../../../assets/img/img5.jpeg";

const ContactsGallery = () => {
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (modalImage) {
      document.body.classList.add(style.no_scroll);
    } else {
      document.body.classList.remove(style.no_scroll);
    }

    // Cleanup when component unmounts
    return () => document.body.classList.remove(style.no_scroll);
  }, [modalImage]);

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const images = [
    { id: 1, src: img1, alt: "Coffee Shop 1" },
    { id: 2, src: img2, alt: "Coffee Shop 2" },
    { id: 3, src: img3, alt: "Coffee Shop 3" },
    { id: 4, src: img4, alt: "Coffee Shop 4" },
    { id: 5, src: img5, alt: "Coffee Shop 5" },
  ];

  return (
    <div className={style.gallery_container}>
      <div className={style.horizontal_gallery}>
        {images.map((image) => (
          <div
            key={image.id}
            className={style.gallery_item}
            onClick={() => openModal(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={style.gallery_image}
            />
          </div>
        ))}
      </div>

      {modalImage && (
        <div className={style.modal} onClick={closeModal}>
          <div
            className={style.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>
            <img src={modalImage} alt="Modal View" className={style.modal_image} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsGallery;
