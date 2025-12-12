import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>📱 App Feedback</h1>
        <p className="subtitle">We'd love to hear from you! Your feedback helps us improve.</p>
      </header>

      <main>
        <FeedbackForm />
      </main>

      <footer>
        <p>Your feedback is valuable to us. Thank you for helping us improve!</p>
      </footer>
    </div>
  )
}

export default App


