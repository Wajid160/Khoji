# Person Finder - OSINT Intelligence Tool 🕵️‍♂️
> **Final Year Project (FYP) - University of Sindh (Batch 2k22-IT)**

**Person Finder** is an advanced OSINT (Open Source Intelligence) tool designed to aggregate and visualize public profile information from major social networks (LinkedIn, Facebook, Twitter/X) in a single, unified interface.

![Person Finder UI](./public/vite.svg) *Note: Replace with actual screenshot*

## 🚀 Features
*   **Multi-Platform Search**: Simultaneously scans LinkedIn, Facebook, and Twitter.
*   **Smart Filtering**: Filters results by Name, Location, University, and Company.
*   **Premium UI**: Glassmorphism design with dark/light mode support.
*   **Real-time Feedback**: Interactive loading states and error handling.
*   **Responsive**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack
*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion (Animations).
*   **Backend / Workflow**: N8N (Workflow Automation Tool).
*   **API**: Google Custom Search API (via N8N).
*   **Icons**: Lucide React.

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Wajid160/PersonFinder-FYP.git
cd person-finder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
(Optional) If you have local environment variables, create a `.env` file.
Currently, the API endpoint is configured in `src/services/api.js`.

### 4. Run Locally
```bash
npm run dev
// Opens at http://localhost:5173
```

## ⚙️ Backend Configuration (N8N)
This project uses **N8N** to handle the Google Search logic.
1.  Import the provided `n8n_workflow_v4.json` into your N8N instance.
2.  Setup Google Custom Search API credentials in N8N.
3.  Activate the workflow.
4.  Update the `N8N_WEBHOOK_URL` in `src/services/api.js` if your N8N instance changes.

## 👥 Meet the Team
**Developed by Batch 2k22-IT:**
*   **Asadullah Jamali**
*   **Wajid Bhatti**
*   **Abdul Manan**

## 📄 License
This project is for educational purposes as part of the University of Sindh FYP curriculum.
