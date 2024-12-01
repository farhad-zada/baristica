import React, { useState } from "react";
import styles from "./photoUploader.module.css";
import { Camera } from "../../icons"; // Предполагается, что вы установили react-feather
import Loading from "../loading/Loading";
import MediaService from "../../services/media.service";
import { useSelector } from "react-redux";
import Error from "../error/Error";

const PhotoUploader = ({ photos, setPhotos ,onPhotosUpdate, text }) => {
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(false)
  const {token} = useSelector(state => state.baristica)

  const mediaService = new MediaService()


  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photos", file);
    setLoading(true)
    try {
      const response = await mediaService.createImg(token, formData)
      const newPhotoUrl = response.data[0].photourl;


      const updatedPhotos = [...photos, newPhotoUrl];
      setPhotos(updatedPhotos);

      // Передача обновленного массива в родительский компонент
      if (onPhotosUpdate) {
        onPhotosUpdate(updatedPhotos);
      }
    } catch (error) {
        setError(true)
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
      <Error status={error} setStatus={setError} />

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
