import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { HomePage } from "@/pages/home.tsx"
import { GoodiesPage } from "@/pages/goodies.tsx"
import { TicTacToePage } from "@/pages/tic-tac-toe.tsx"
import { NotFoundPage } from "@/pages/not-found.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="goodies" element={<GoodiesPage />} />
            <Route path="goodies/tictactoe" element={<TicTacToePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
