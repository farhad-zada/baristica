import React, { useState, useEffect } from 'react';
import style from "./comments.module.css";
import { Delete, Edit } from '../../../../icons';
import PhotoUploader from '../../../../components/photoUploader/PhotoUploader';

const Comment = (comment) => {
    const [commentField, setCommentField] = useState("");
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // New state to toggle edit mode

    useEffect(() => {
        setCommentField(comment.comment);
    }, [comment.comment]);

    useEffect(() => {
        setUploadedPhotos(comment.imgs);
    }, [comment.imgs]);

    console.log(uploadedPhotos, "uploadedPhotos")

    const handlePhotosUpdate = (photos) => {
        setUploadedPhotos(photos);
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev); // Toggle the edit mode
    };

    return (
        <div className={style.comment_section}>
            <div className={`${style.comment} gray border8`} id={comment.id} key={comment.id}>
                <div className={`${style.comment_head} flex a-center`}>
                    <img src={comment?.product_img} alt="" />
                    <h5 className="darkGrey_color f20 fw700">{comment?.name}</h5>
                </div>
                <hr />
                <div className={`${style.comment_body} flex a-center j-between`}>
                    <div className={style.comment_body_left}>
                        <p className="darkGrey_color">{comment?.date}</p>
                        <p className={`${style.comment_txt} darkGrey_color`}>{commentField}</p>
                        <div className={`${style.comment_imgs} flex`}>
                            {uploadedPhotos?.map((img, index) => (
                                <img key={index} src={img} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className={`${style.comment_body_right} flex a-center`}>
                        <button onClick={handleEditClick}>
                            {Edit}
                        </button>
                        <button id={`delete_${comment.id}`}>
                            {Delete}
                        </button>
                    </div>
                </div>
            </div>
            {isEditing && 
            <>
                <textarea
                    className={`${style.comment_input} gray f20 fw400 darkGrey_color`}
                    value={commentField}
                    onChange={(e) => setCommentField(e.target.value)}
                />
                <PhotoUploader photos={comment.imgs} setPhotos={setUploadedPhotos} onPhotosUpdate={handlePhotosUpdate} text={''} />
            </>
            }
        </div>
    );
};

export default Comment;
