import React, { useEffect, useState } from 'react'
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import UserService from '../../../../services/user.service';
import Loading from '../../../../components/loading/Loading';

const { profile } = PagesText;

const Comments = () => {
  const { lang, token } = useSelector((state) => state.baristica);

  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const userService = new UserService()

  const getComments = async () => {
    setLoading(true)
    try {
      const response = await userService.getComments(token)
      setComments(response.data.comments)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      getComments()
    }
  }, [token])

  return (
    <div className='comments'>
      <Loading status={loading} />
      <h1>{profile[lang]?.comments?.title}:</h1>
      <div className='all_comments'>
        {comments.map((comment) => (
          <Comment comment={comment} getComments={getComments} />
        ))}
      </div>
    </div>
  )
}

export default Comments