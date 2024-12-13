import React, { useState, useEffect } from 'react';
import style from "./comments.module.css";
import { Delete, Edit, Star } from '../../../../icons';
import PhotoUploader from '../../../../components/photoUploader/PhotoUploader';
import { useSelector } from 'react-redux';
import pageText from '../../../../content/PagesText.json'
import Rating from '../../../../components/rating/Rating';

const { productDetail } = pageText
const Comment = ({ products,comment, getComments }) => {
    const [commentField, setCommentField] = useState("");
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // New state to toggle edit mode
    const [submitted, setSubmitted] = useState(false)
    const [selectedRating, setSelectedRating] = useState(0);


    const { lang } = useSelector(state => state.baristica)


    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const handlePhotosUpdate = (photos) => {
        setUploadedPhotos(photos);
    };

    const handleEditClick = () => {
        setIsEditing((prev) => !prev); // Toggle the edit mode
    };

    const updateComment = async () => {
        try {

            await getComments()
            setIsEditing(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        setCommentField(comment.text);
        setUploadedPhotos(comment.photourls);
    }, [comment]);


    return (
        <div className={style.comment_section}>
            <div className={`${style.comment} gray border8`} id={comment.id} key={comment.id}>
                <div className={`${style.comment_head} flex a-center`}>
                    <img src={products[comment.product].images ? products[comment.product].images[0] : ''} alt="" />
                    <h5 className="darkGrey_color f20 fw700 robotoFont">{products[comment.product].name[lang] ? products[comment.product].name[lang] : products[comment.product].name['az'] }</h5>
                </div>
                <hr />
                <div className={`${style.comment_body} flex a-center j-between`}>
                    <div className={style.comment_body_left}>
                        <p className="darkGrey_color robotoFont">{comment?.date}</p>
                        <p className={`${style.comment_txt} darkGrey_color robotoFont`}>{commentField}</p>
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
                        <button type='button'>
                            {Delete}
                        </button>
                    </div>
                </div>
            </div>
            {isEditing &&
                <>
                    <textarea
                        className={`${style.comment_input} gray f20 fw400 darkGrey_color robotoFont`}
                        value={commentField}
                        onChange={(e) => setCommentField(e.target.value)}
                    />

                    <Rating submitted={submitted} setSubmitted={setSubmitted} totalStars={5} Star={Star} onChange={handleRatingChange} />

                    <PhotoUploader photos={uploadedPhotos} setPhotos={setUploadedPhotos} onPhotosUpdate={handlePhotosUpdate} text={lang ? productDetail[lang].reviews.addImg : ''} />

                    <button type='button' className={style.saveBtn} onClick={updateComment}> {lang ? productDetail[lang].reviews.saveBtn : ''}</button>
                </>
            }
        </div>
    );
};

export default Comment;
