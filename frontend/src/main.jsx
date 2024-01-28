import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-xpteltz632r6ek4d.us.auth0.com"
      clientId="IjArsD9bP6P8F9DD0fAazTHrpC4wYw9R"
      authorizationParams={{
        redirect_uri: process.env.NODE_ENV === "development" ? "http://localhost:3000/dashboard" : "https://worksheeps.onrender.com/dashboard"
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)
