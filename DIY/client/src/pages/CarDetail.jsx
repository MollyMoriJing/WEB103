import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/priceCalculator'
import { carOptions } from '../utilities/carOptions'
import './CarDetail.css'

function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCar()
  }, [id])

  const fetchCar = async () => {
    try {
      setLoading(true)
      const data = await getCar(id)
      setCar(data)
    } catch (err) {
      setError('Failed to load car details')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
      return
    }

    try {
      await deleteCar(id)
      navigate('/cars')
    } catch (err) {
      alert('Failed to delete car')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error || !car) {
    return (
      <div className="error-state">
        <p>{error || 'Car not found'}</p>
        <Link to="/cars" className="back-link">
          Back to Cars
        </Link>
      </div>
    )
  }

  return (
    <div className="car-detail">
      <div className="detail-header">
        <Link to="/cars" className="back-link">
          ← Back to All Cars
        </Link>
        <h2>{car.name}</h2>
      </div>

      <div className="detail-content">
        <div className="detail-visual">
          <div className="large-car-preview" data-color={car.exterior_color}>
            <div className="showroom-bg"></div>
            <div className="car-silhouette-large">
              <svg viewBox="0 0 200 100" className="car-svg-large">
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
                <line x1="50" y1="55" x2="150" y2="55" stroke="#000" strokeWidth="0.5"/>
                <path d="M 100 40 L 100 70" stroke="#000" strokeWidth="1" opacity="0.3"/>
              </svg>
              <div className="ground-reflection"></div>
            </div>
            <div className="spotlight spotlight-left"></div>
            <div className="spotlight spotlight-right"></div>
          </div>

          <div className="interior-detail">
            <h4>Interior</h4>
            <span className="interior-icon-large">
              {carOptions.interior.find(i => i.value === car.interior)?.icon}
            </span>
            <p>{car.interior.charAt(0).toUpperCase() + car.interior.slice(1)}</p>
          </div>
        </div>

        <div className="detail-info">
          <div className="info-section">
            <h3>Specifications</h3>
            <table className="specs-table">
              <tbody>
                <tr>
                  <td className="spec-label">Exterior Color</td>
                  <td className="spec-value">
                    {carOptions.exteriorColor.find(c => c.value === car.exterior_color)?.icon}{' '}
                    {car.exterior_color.charAt(0).toUpperCase() + car.exterior_color.slice(1)}
                  </td>
                </tr>
                <tr>
                  <td className="spec-label">Wheels</td>
                  <td className="spec-value">
                    {carOptions.wheels.find(w => w.value === car.wheels)?.icon}{' '}
                    {car.wheels.charAt(0).toUpperCase() + car.wheels.slice(1)}
                  </td>
                </tr>
                <tr>
                  <td className="spec-label">Interior</td>
                  <td className="spec-value">
                    {carOptions.interior.find(i => i.value === car.interior)?.icon}{' '}
                    {car.interior.charAt(0).toUpperCase() + car.interior.slice(1)}
                  </td>
                </tr>
                <tr>
                  <td className="spec-label">Roof</td>
                  <td className="spec-value">
                    {carOptions.roof.find(r => r.value === car.roof)?.icon}{' '}
                    {car.roof.charAt(0).toUpperCase() + car.roof.slice(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-section price-section">
            <h3>Total Price</h3>
            <p className="detail-price">{formatPrice(car.total_price)}</p>
          </div>

          <div className="detail-actions">
            <Link to={`/cars/${car.id}/edit`} className="btn btn-edit-large">
              Edit Car
            </Link>
            <button onClick={handleDelete} className="btn btn-delete-large">
              Delete Car
            </button>
          </div>

          <div className="info-section">
            <p className="created-at">
              Created: {new Date(car.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail

