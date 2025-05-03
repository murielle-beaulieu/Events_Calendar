import { Routes, Route, BrowserRouter } from 'react-router'
import './App.css'
import MonthlyCalendar from './components/MonthlyCalendar/MonthlyCalendar'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonthlyCalendar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
