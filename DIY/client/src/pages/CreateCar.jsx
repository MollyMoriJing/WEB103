import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { carOptions, BASE_PRICE } from '../utilities/carOptions'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator'
import { validateCarConfiguration } from '../utilities/validation'
import './CreateCar.css'

function CreateCar() {
  const navigate = useNavigate()
  const [carName, setCarName] = useState('')
  const [selections, setSelections] = useState({
    exterior_color: 'red',
    wheels: 'standard',
    interior: 'cloth',
    roof: 'solid',
  })
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Update total price when selections change
  useEffect(() => {
    const price = calculateTotalPrice(selections)
    setTotalPrice(price)
  }, [selections])

  const handleOptionChange = (category, value) => {
    setSelections((prev) => ({
      ...prev,
      [category]: value,
    }))
    setError('') // Clear error when user makes changes
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!carName.trim()) {
      setError('Please enter a name for your car')
      return
    }

    // Validate configuration
    const validation = validateCarConfiguration(selections)
    if (!validation.isValid) {
      setError(validation.errors[0])
      return
    }

    setLoading(true)

    try {
      const carData = {
        name: carName,
        ...selections,
        total_price: totalPrice,
      }

      await createCar(carData)
      navigate('/cars')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-car">
      <h2>Build Your Dream Car</h2>

      <div className="car-builder">
        <div className="car-preview">
          <div className="car-visual" data-color={selections.exterior_color}>
            <div className="showroom-bg"></div>
            <div className="car-silhouette">
              <svg viewBox="0 0 200 100" className="car-svg">
                {/* Car body */}
                <path d="M 20 70 L 30 50 L 50 40 L 150 40 L 170 50 L 180 70 Z" 
                      fill={selections.exterior_color} 
                      stroke="#000" 
                      strokeWidth="1.5"
                      className="car-body-path"/>
                
                {/* Windows */}
                <path d="M 55 40 L 65 35 L 90 35 L 95 40 Z" 
                      fill={selections.roof === 'glass' ? 'rgba(135,206,235,0.6)' : 'rgba(20,20,20,0.9)'} 
                      stroke="#000" 
                      strokeWidth="1"
                      className="car-window-front"/>
                <path d="M 105 40 L 110 35 L 135 35 L 140 40 Z" 
                      fill={selections.roof === 'glass' ? 'rgba(135,206,235,0.6)' : 'rgba(20,20,20,0.9)'} 
                      stroke="#000" 
                      strokeWidth="1"
                      className="car-window-back"/>
                
                {/* Wheels */}
                <circle cx="45" cy="70" r="12" 
                        fill="#1a1a1a" 
                        stroke={selections.wheels === 'chrome' ? '#c0c0c0' : '#333'} 
                        strokeWidth={selections.wheels === 'chrome' ? '3' : '2'}
                        className={`wheel wheel-${selections.wheels}`}/>
                <circle cx="45" cy="70" r="7" 
                        fill={selections.wheels === 'sport' ? '#dc0000' : '#444'} 
                        className="wheel-center"/>
                
                <circle cx="155" cy="70" r="12" 
                        fill="#1a1a1a" 
                        stroke={selections.wheels === 'chrome' ? '#c0c0c0' : '#333'} 
                        strokeWidth={selections.wheels === 'chrome' ? '3' : '2'}
                        className={`wheel wheel-${selections.wheels}`}/>
                <circle cx="155" cy="70" r="7" 
                        fill={selections.wheels === 'sport' ? '#dc0000' : '#444'} 
                        className="wheel-center"/>
                
                {/* Lights */}
                <circle cx="175" cy="55" r="3" fill="#ffeb3b" className="headlight"/>
                <circle cx="25" cy="55" r="2" fill="#ff0000" className="taillight"/>
                
                {/* Details */}
                <line x1="50" y1="55" x2="150" y2="55" stroke="#000" strokeWidth="0.5"/>
                <path d="M 100 40 L 100 70" stroke="#000" strokeWidth="1" opacity="0.3"/>
              </svg>
              
              {/* Ground reflection */}
              <div className="ground-reflection"></div>
            </div>
            
            {/* Spotlights */}
            <div className="spotlight spotlight-left"></div>
            <div className="spotlight spotlight-right"></div>
          </div>

          <div className="interior-preview">
            <h4>Interior: {selections.interior}</h4>
            <span className="interior-icon">
              {carOptions.interior.find(i => i.value === selections.interior)?.icon}
            </span>
          </div>

          <div className="price-display">
            <h3>Total Price</h3>
            <p className="price">{formatPrice(totalPrice)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-group">
            <label htmlFor="carName">Car Name</label>
            <input
              type="text"
              id="carName"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="e.g., My Dream Car"
              required
            />
          </div>

          <div className="form-group">
            <label>Exterior Color</label>
            <div className="options-grid">
              {carOptions.exteriorColor.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-btn ${selections.exterior_color === option.value ? 'selected' : ''}`}
                  onClick={() => handleOptionChange('exterior_color', option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-price">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Wheels</label>
            <div className="options-grid">
              {carOptions.wheels.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-btn ${selections.wheels === option.value ? 'selected' : ''}`}
                  onClick={() => handleOptionChange('wheels', option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-price">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Interior</label>
            <div className="options-grid">
              {carOptions.interior.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-btn ${selections.interior === option.value ? 'selected' : ''}`}
                  onClick={() => handleOptionChange('interior', option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-price">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Roof</label>
            <div className="options-grid">
              {carOptions.roof.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`option-btn ${selections.roof === option.value ? 'selected' : ''}`}
                  onClick={() => handleOptionChange('roof', option.value)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-price">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create My Car'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCar

