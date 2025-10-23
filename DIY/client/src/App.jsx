import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import CreateCar from './pages/CreateCar'
import ViewCars from './pages/ViewCars'
import CarDetail from './pages/CarDetail'
import EditCar from './pages/EditCar'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Bolt Bucket 🏎️</h1>
          <nav>
            <Link to="/">CUSTOMIZE</Link>
            <Link to="/cars">VIEW CARS</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<CreateCar />} />
            <Route path="/cars" element={<ViewCars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/cars/:id/edit" element={<EditCar />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Engineering Excellence • Crafted Performance • Bolt Bucket™</p>
        </footer>
      </div>
    </Router>
  )
}

export default App

