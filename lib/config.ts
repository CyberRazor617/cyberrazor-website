// Configuration for the website
export const config = {
  // Backend API URL - adjust this based on your environment
  backendUrl: process.env.BACKEND_URL || 'https://cyberrazorbackend.vercel.app',
  
  // User portal URL - adjust this based on your setup
  userPortalUrl: process.env.USER_PORTAL_URL || 'https://cyberrazoruser.vercel.app',
  
  // API endpoints
  api: {
    auth: {
      signup: '/api/auth/signup',
      login: '/api/auth/login',
      me: '/api/auth/me',
    }
  }
}

export default config
