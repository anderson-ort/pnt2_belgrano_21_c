import { BrowserRouter } from 'react-router'
import '../styles/App.css'
import AppRoutes from './AppRoutes'
import { useAuthListener } from '../hooks/useAuthListener'


function App() {

  useAuthListener()
  
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </>
  )
}

export default App
