import { useContext, useEffect } from 'react'
import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CLEAR_LOCAL_STORAGE, LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const router = useRouteElements()

  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener(CLEAR_LOCAL_STORAGE, reset)

    return LocalStorageEventTarget.removeEventListener(CLEAR_LOCAL_STORAGE, reset)
  }, [reset])
  return (
    <>
      {router}
      <ToastContainer />
    </>
  )
}

export default App
