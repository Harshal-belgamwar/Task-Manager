import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import {store} from './Store/index.jsx'
import {persistor} from "./Store/index.jsx"
import { PersistGate } from "redux-persist/integration/react";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
      
    </Provider>

  </StrictMode>,
)
