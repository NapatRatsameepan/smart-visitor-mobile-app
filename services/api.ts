/**
 * Centralized API Service for the Mobile App.
 * Using fetch for simplicity, but can be swapped for Axios.
 */

// Replace with your actual backend IP (e.g., http://192.168.1.x:3000)
// For local testing on Emulator, you can use http://10.0.2.2:3000
const BASE_URL = /*process.env.EXPO_PUBLIC_API_URL || */ 'http://192.168.1.221:3000';

const apiRequest = async (endpoint: string, method: string = 'GET', body: any = null) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}` // Future Auth integration
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const apiService = {
  // OCR Endpoints
  ocr: {
    analyzeCombined: (idBase64: string, vehicleBase64: string) => 
      apiRequest('/api/ocr/analyze-combined', 'POST', { idImage: idBase64, vehicleImage: vehicleBase64 }),
  },

  // Visit Endpoints
  visits: {
    checkIn: (data: any) => apiRequest('/api/visits/check-in', 'POST', data),
    checkOut: (qrToken: string) => apiRequest('/api/visits/check-out', 'POST', { qrCodeToken: qrToken }),
  },

  // Master Data
  master: {
    getProvinces: () => apiRequest('/api/master/provinces'),
    getCarBrands: () => apiRequest('/api/master/car-brands'),
    getCarColors: () => apiRequest('/api/master/car-colors'),
    getMissions: () => apiRequest('/api/master/visit-missions'),
    getDepartments: () => apiRequest('/api/master/departments'),
  }
};
