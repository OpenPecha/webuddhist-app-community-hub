import { useState } from 'react'
import userback from '@api/userback'
import './FeedbackForm.css'

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Get projectId from environment or use default
      const projectId = import.meta.env.VITE_USERBACK_PROJECT_ID || 4455

      // Map form data to API schema
      const apiPayload = {
        projectId: Number.parseInt(projectId, 10),
        email: formData.email || 'anonymous@example.com', // Required field
        feedbackType: 'idea', // Default feedback type
        title: formData.title || 'Feedback Submission', // Required field
        description: formData.description, // Required field
        notify: true, // Default to true
      }

      // Add optional fields if provided
      if (formData.name) {
        apiPayload.name = formData.name
      }

      // Add pageUrl from current location
      if (globalThis.window !== undefined) {
        apiPayload.pageUrl = globalThis.window.location.href
      }

      console.log('Submitting feedback to Userback API:', apiPayload)

      // Call Userback API
      const { data } = await userback.createFeedback(apiPayload)
      
      console.log('Feedback submitted successfully:', data)

      // Show success message
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Error submitting feedback:', err)
      setError(err.message || 'There was an error submitting your feedback. Please try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Thank You!</h2>
        <p>Your feedback has been submitted successfully. We appreciate your input!</p>
      </div>
    )
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Your Name (Optional)</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Title <span className="required">*</span></label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Brief summary of your feedback"
          required
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description <span className="required">*</span></label>
        <textarea
          id="description"
          name="description"
          rows="6"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us what you think..."
          required
          maxLength={65535}
        />
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <button type="submit" className="submit-btn" disabled={loading}>
        <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
      </button>
    </form>
  )
}

export default FeedbackForm

