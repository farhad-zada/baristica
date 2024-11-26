import React, { useState } from "react";
import styles from "./photoUploader.module.css";
import { Camera } from "../../icons"; // Предполагается, что вы установили react-feather
import Loading from "../loading/Loading";

const PhotoUploader = ({ onPhotosUpdate, text }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false)
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    setLoading(true)
    try {
      // Пример запроса на сервер
      //   const response = await fetch("https://example.com/upload", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error("Ошибка загрузки файла");
      //   }

      //   const data = await response.json(); // Предполагаем, что сервер возвращает JSON с URL
      //   const newPhotoUrl = data.url;
      const newPhotoUrl = '';


      const updatedPhotos = [...photos, newPhotoUrl];
      setPhotos(updatedPhotos);

      // Передача обновленного массива в родительский компонент
      if (onPhotosUpdate) {
        onPhotosUpdate(updatedPhotos);
      }
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleDeletePhoto = (url) => {
    const updatedPhotos = photos.filter((photo) => photo !== url);
    setPhotos(updatedPhotos);

    if (onPhotosUpdate) {
      onPhotosUpdate(updatedPhotos);
    }
  };

  return (
    <div className={styles.photoUploader}>
      <Loading status={loading} />
      <label className={styles.uploadButton}>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className={styles.fileInput}
        />
        {Camera}
        {text}
      </label>
      <div className={styles.photoGrid}>
        {photos.map((photoUrl, index) => (
          <div key={index} className={styles.photoItem}>
            <img src={photoUrl} alt={`Uploaded ${index}`} className={styles.photo} />
            <button
              className={styles.deleteButton}
              onClick={() => handleDeletePhoto(photoUrl)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
