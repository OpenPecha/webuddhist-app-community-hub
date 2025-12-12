# Mobile App Feedback Page

A beautiful, responsive feedback collection page for mobile applications, built with **Vite + React** and designed to be hosted on GitHub Pages.

## Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React** - Modern UI library with hooks
- 🎨 Modern, clean design with gradient backgrounds
- 📱 Fully responsive (works on mobile, tablet, and desktop)
- ⭐ Interactive star rating system
- 📝 Multiple feedback types (Bug Report, Feature Request, etc.)
- ✨ Smooth animations and transitions
- 💾 Local storage for feedback (can be easily integrated with backend)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd webuddhist-app-feedback
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

### Build the project:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create a `dist` folder with the production-ready files.

### Preview the production build:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Deploying to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create a `.github/workflows/deploy.yml` file (see example below)
2. Push your code to GitHub
3. GitHub Actions will automatically build and deploy your site

### Option 2: Manual Deployment

1. Build the project: `npm run build`
2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions" or upload the `dist` folder contents
5. Your site will be available at: `https://yourusername.github.io/webuddhist-app-feedback/`

### GitHub Actions Workflow Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Project Structure

```
.
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── FeedbackForm.jsx
│   │   └── FeedbackForm.css
│   ├── App.jsx          # Main App component
│   ├── App.css          # App styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── README.md           # This file
```

## Customization

### Changing Colors

Edit the CSS variables in `src/App.css`:

```css
:root {
    --primary-color: #6366f1;    /* Main color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    --success-color: #10b981;     /* Success message color */
}
```

### Adding Form Fields

Edit `src/components/FeedbackForm.jsx` to add new form fields:

```jsx
<div className="form-group">
    <label htmlFor="newField">New Field</label>
    <input
        type="text"
        id="newField"
        name="newField"
        value={formData.newField}
        onChange={handleChange}
        placeholder="Enter value"
    />
</div>
```

Don't forget to add the field to the initial state in `useState`.

## Userback API Integration

This project is integrated with the Userback API for feedback submission. The form automatically sends feedback to your Userback project.

### Configuration

1. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Add your Userback credentials:
```env
VITE_USERBACK_API_KEY=your_api_key_here
VITE_USERBACK_PROJECT_ID=4455
VITE_USERBACK_API_URL=https://api.userback.io/v1
```

### API Schema Mapping

The form fields are mapped to the Userback API schema:

- **Required Fields:**
  - `projectId` - From `VITE_USERBACK_PROJECT_ID` env variable
  - `email` - From form (required)
  - `feedbackType` - Mapped from form: `Bug`, `Idea`, or `General`
  - `title` - From form title field (required)
  - `description` - From form message field (required)

- **Optional Fields:**
  - `name` - From form name field
  - `rating` - From form star rating
  - `pageUrl` - Automatically captured from current page URL
  - `notify` - Defaults to `true`

### Feedback Type Mapping

- `bug` → `Bug`
- `feature` / `improvement` → `Idea`
- `compliment` / `other` → `General`

### API Usage Example

The form uses the Userback API client:

```javascript
import userback from '@api/userback';

userback.createFeedback({
  projectId: 4455,
  email: 'user@example.com',
  feedbackType: 'General',
  title: 'Feedback title',
  description: 'Feedback description',
  notify: true
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - UI library
- Modern CSS with CSS Variables

## License

Feel free to use this project for your own purposes!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
