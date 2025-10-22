import { Routes, Route } from 'react-router'
import Home from '../pages/Home'
import Session from '../pages/Session'
import FerreteriaGPT from '../pages/FerreteriaGPT'
import ProtectedRoute from '../components/ProtectedRoute'


const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/consultas" element={
            <ProtectedRoute>
                <FerreteriaGPT />
            </ProtectedRoute>

        } />
    </Routes>
)

export default AppRoutes