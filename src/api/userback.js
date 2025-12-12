/**
 * Userback API client
 * 
 * Example usage:
 * import userback from '@api/userback';
 * 
 * userback.createFeedback({
 *   projectId: 4455,
 *   email: 'user@example.com',
 *   feedbackType: 'General',
 *   title: 'Feedback title',
 *   description: 'Feedback description',
 *   notify: true
 * })
 *   .then(({ data }) => console.log(data))
 *   .catch(err => console.error(err));
 */

const API_BASE_URL = import.meta.env.VITE_USERBACK_API_URL || 'https://api.userback.io/v1'

class UserbackAPI {
  constructor() {
    this.apiKey = import.meta.env.VITE_USERBACK_API_KEY
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        ...options.headers,
      },
    }

    if (options.body) {
      config.body = JSON.stringify(options.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `API request failed: ${response.statusText}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      console.error('Userback API Error:', error)
      throw error
    }
  }

  /**
   * Create a new feedback
   * @param {Object} feedbackData - Feedback data according to API schema
   * @returns {Promise<{data: Object}>}
   */
  createFeedback(feedbackData) {
    return this.request('/feedback', {
      method: 'POST',
      body: feedbackData,
    })
  }
}

// Export singleton instance
const userback = new UserbackAPI()
export default userback


