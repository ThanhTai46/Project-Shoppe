import useRouteElements from './hooks/useRouteElements'

function App() {
  const router = useRouteElements()
  return <>{router}</>
}

export default App
