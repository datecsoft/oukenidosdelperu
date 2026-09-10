import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PublicList from './pages/PublicList'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="bg-brand-darker min-h-screen text-brand-light font-sans selection:bg-brand-primary selection:text-white">
        <Header />
        
        <Routes>
          <Route path="/" element={<PublicList />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
