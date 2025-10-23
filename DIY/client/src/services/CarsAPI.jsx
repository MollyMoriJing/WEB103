const API_URL = '/api/custom-items'

// Get all cars
export const getAllCars = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch cars')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}

// Get a single car by id
export const getCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch car')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching car:', error)
    throw error
  }
}

// Create a new car
export const createCar = async (carData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create car')
    }
    
    return data
  } catch (error) {
    console.error('Error creating car:', error)
    throw error
  }
}

// Update a car
export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update car')
    }
    
    return data
  } catch (error) {
    console.error('Error updating car:', error)
    throw error
  }
}

// Delete a car
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete car')
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting car:', error)
    throw error
  }
}

