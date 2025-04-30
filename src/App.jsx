import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Main from './Components/Main'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Main />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <div>
            <Navbar />
            <Login />
            <Footer />
          </div>
        } />
        <Route path="/signup" element={
          <div>
            <Navbar />
            <Signup />
            <Footer />
          </div>
        } />
        <Route path="*" element={
          <div>
            <Navbar />
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h1>Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
            <Footer />
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App