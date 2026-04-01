import Constants from 'expo-constants';

/**
 * Centralized API Service for the Mobile App.
 * Automatically detects the backend URL based on the environment.
 */

const getBaseUrl = () => {
  // 1. If running on Web
  if (typeof window !== 'undefined') {
    return 'http://localhost:3000';
  }

  // 2. If running on Mobile (Emulator or Physical Device)
  // Get the debugger host (the IP of the machine running the packager)
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (!localhost) {
    // Fallback if hostUri is not available
    return 'http://10.0.2.2:3000'; // Default for Android Emulator
  }

  return `http://${localhost}:3000`;
};

const BASE_URL = getBaseUrl();
console.log('📡 API Connected to:', BASE_URL);

const apiRequest = async (endpoint: string, method: string = 'GET', body: any = null) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
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
