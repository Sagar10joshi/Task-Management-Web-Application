import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App

// export default function App() {
//   return (
//     <div className="bg-green-500 text-white p-10">
//       Tailwind is working 🚀
//     </div>
//   );
// }