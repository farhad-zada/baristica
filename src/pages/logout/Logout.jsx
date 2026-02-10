import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './logout.module.css'
import pageText from '../../content/PagesText.json'
import AuthService from '../../services/auth.service'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'
import { handleApiReqRes } from '../../utils/handleApiReqRes.util'
import { setFavoritesCount, setToken, setUser } from '../../redux/slice'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const { logout } = pageText

export default function Logout() {
  const { lang, token } = useSelector((state) => state.baristica)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('Something went wrong.')
  const [didLogout, setDidLogout] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authService = new AuthService()
  const { removeItemFromStorage } = useLocalStorage('baristicaToken')

  useEffect(() => {
    const runLogout = async () => {
      if (!token) {
        setDidLogout(true)
        return
      }

      setLoading(true)
      try {
        const request = authService.logout(token)
        await handleApiReqRes(request)
        dispatch(setToken(false))
        dispatch(setUser({}))
        dispatch(setFavoritesCount(0))
        removeItemFromStorage()
        setDidLogout(true)
      } catch (err) {
        setError(true)
        setMessage(err.message)
      } finally {
        setLoading(false)
      }
    }

    runLogout()
  }, [token])

  return (
    <div className={styles.logout + ' flex j-center'}>
      <Loading status={loading} />
      <Error status={error} setStatus={setError} message={message} />

      <div className="container">
        <h2 className="f32 fw700 text-center">{lang ? logout[lang].heading : ''}</h2>
        <p className="f20 fw400 text-center">{lang ? logout[lang].text : ''}</p>
        <div className="flex j-center">
          <span
            className={styles.button}
            onClick={() => navigate(didLogout ? '/login' : '/')}
          >
            {lang ? logout[lang].button : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
