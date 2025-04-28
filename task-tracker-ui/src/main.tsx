import { Provider } from "react-redux"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { client } from './lib/apollo-client.ts'
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </StrictMode>
  </BrowserRouter>
  ,
)
