import { BrowserRouter, Route, Routes } from "react-router"
import './index.css'
import Index from "./pages/index"
import Header from "./components/Header/Header"

function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/*' element={
          <>
          <Header></Header><h1>Not found 404</h1>
          </>
        }/>
    </Routes>
    </BrowserRouter>

  )
}

export default Router