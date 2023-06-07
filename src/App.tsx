import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const router = useRouteElements()
  return (
    <>
      {router}
      <ToastContainer />
    </>
  )
}

export default App
