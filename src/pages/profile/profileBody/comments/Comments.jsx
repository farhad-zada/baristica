import React, { useEffect, useState } from 'react'
import PagesText from '../../../../content/PagesText.json';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import UserService from '../../../../services/user.service';
import Loading from '../../../../components/loading/Loading';
import Pagination from '../../../../components/pagination/Pagination';
import Error from '../../../../components/error/Error';
import { handleApiReqRes } from '../../../../utils/handleApiReqRes.util';


const { profile } = PagesText;

const Comments = () => {
  const { lang, token } = useSelector((state) => state.baristica);

  const [comments, setComments] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("Something went wrong.")

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getComments(page)
  };

  const userService = new UserService()

  const getComments = async (currentPage) => {
    setLoading(true)
    try {
      const request = userService.getComments(token, currentPage)
      const response = await handleApiReqRes(request);
      setComments(response.data.comments)
      setProducts(response.data.products)
      setTotalPages(response.page_count ? response.page_count : 1)
    } catch (error) {
      setError(true)
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      getComments(1)
    }
  }, [token])

  return (
    <div className='comments'>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} message={message} />

      <h1 className='robotoFont'>{profile[lang]?.comments?.title}:</h1>
      <div className='all_comments'>
        {comments.map((comment) => (
          <Comment products={products} comment={comment} getComments={getComments} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          justify={'justify-end'}
        />
      </div>
    </div>
  )
}

export default Comments