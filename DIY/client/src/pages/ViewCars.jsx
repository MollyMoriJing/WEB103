import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/priceCalculator'
import './ViewCars.css'

function ViewCars() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const data = await getAllCars()
      setCars(data)
    } catch (err) {
      setError('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, carName) => {
    if (!window.confirm(`Are you sure you want to delete "${carName}"?`)) {
      return
    }

    try {
      await deleteCar(id)
      setCars(cars.filter((car) => car.id !== id))
    } catch (err) {
      alert('Failed to delete car')
    }
  }

  if (loading) {
    return <div className="loading">Loading cars...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="view-cars">
      <h2>Your Custom Cars</h2>

      {cars.length === 0 ? (
        <div className="empty-state">
          <p>No cars yet! Create your first custom car.</p>
          <Link to="/" className="create-link">
            Create Car
          </Link>
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-card-visual" data-color={car.exterior_color}>
                <div className="showroom-bg-card"></div>
                <svg viewBox="0 0 200 100" className="car-svg-card">
                  <path d="M 20 70 L 30 50 L 50 40 L 150 40 L 170 50 L 180 70 Z" 
                        fill={car.exterior_color} 
                        stroke="#000" 
                        strokeWidth="1.5"
                        className="car-body-path"/>
                  <path d="M 55 40 L 65 35 L 90 35 L 95 40 Z" 
                        fill={car.roof === 'glass' ? 'rgba(135,206,235,0.6)' : 'rgba(20,20,20,0.9)'} 
                        stroke="#000" 
                        strokeWidth="1"
                        className="car-window-front"/>
                  <path d="M 105 40 L 110 35 L 135 35 L 140 40 Z" 
                        fill={car.roof === 'glass' ? 'rgba(135,206,235,0.6)' : 'rgba(20,20,20,0.9)'} 
                        stroke="#000" 
                        strokeWidth="1"
                        className="car-window-back"/>
                  <circle cx="45" cy="70" r="12" 
                          fill="#1a1a1a" 
                          stroke={car.wheels === 'chrome' ? '#c0c0c0' : '#333'} 
                          strokeWidth={car.wheels === 'chrome' ? '3' : '2'}
                          className={`wheel wheel-${car.wheels}`}/>
                  <circle cx="45" cy="70" r="7" 
                          fill={car.wheels === 'sport' ? '#dc0000' : '#444'} 
                          className="wheel-center"/>
                  <circle cx="155" cy="70" r="12" 
                          fill="#1a1a1a" 
                          stroke={car.wheels === 'chrome' ? '#c0c0c0' : '#333'} 
                          strokeWidth={car.wheels === 'chrome' ? '3' : '2'}
                          className={`wheel wheel-${car.wheels}`}/>
                  <circle cx="155" cy="70" r="7" 
                          fill={car.wheels === 'sport' ? '#dc0000' : '#444'} 
                          className="wheel-center"/>
                  <circle cx="175" cy="55" r="3" fill="#ffeb3b" className="headlight"/>
                  <circle cx="25" cy="55" r="2" fill="#ff0000" className="taillight"/>
                </svg>
              </div>

              <div className="car-card-content">
                <h3>{car.name}</h3>
                
                <div className="car-specs">
                  <div className="spec">
                    <span className="spec-label">Exterior:</span>
                    <span className="spec-value">{car.exterior_color}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Wheels:</span>
                    <span className="spec-value">{car.wheels}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Interior:</span>
                    <span className="spec-value">{car.interior}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Roof:</span>
                    <span className="spec-value">{car.roof}</span>
                  </div>
                </div>

                <div className="car-price">
                  <strong>{formatPrice(car.total_price)}</strong>
                </div>

                <div className="car-actions">
                  <Link to={`/cars/${car.id}`} className="btn btn-view">
                    View Details
                  </Link>
                  <Link to={`/cars/${car.id}/edit`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car.id, car.name)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewCars

