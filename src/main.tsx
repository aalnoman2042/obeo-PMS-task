import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router'
// import { router } from './routes'
// import { ThemeProvider } from './provider/theme.provider'
// import App from './App.tsx'
import {Provider} from "react-redux"



import { store } from './Redux/store';
import { router } from './Routes/Routes';
// import { store } from './redux/store'
// import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>


  < RouterProvider router={router}/>
    
   
    </Provider>
  </StrictMode>,
)