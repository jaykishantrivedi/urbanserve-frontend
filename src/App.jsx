import AppRouter from "./routes/AppRouter"
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import useTokenRefresh from "./hooks/useTokenRefresh"

const App = () => {
  // Proactively refreshes the access token every 13 minutes and on tab focus
  useTokenRefresh()

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
