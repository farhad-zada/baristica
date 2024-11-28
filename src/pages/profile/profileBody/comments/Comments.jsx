import React from 'react'
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const { profile } = PagesText;

const Comments = () => {
  const { lang } = useSelector((state) => state.baristica);
  return (
    <div className='comments'>
      <h1>{profile[lang]?.comments?.title}:</h1>
      <div className='all_comments'>
        {profile[lang]?.comments?.list?.map((comment) => (
          <Comment {...comment}/>
        ))}
      </div>
    </div>
  )
}

export default Comments