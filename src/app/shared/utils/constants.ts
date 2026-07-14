// API Endpoints
export const API_BASE_URL = 'https://padel-booking-backend.onrender.com';
//LOCAL
//export const API_BASE_URL= 'http://localhost:3000';

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  REFRESH_TOKEN: 'refreshToken'
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CLUBS: '/clubs',
  CLUB_DETAIL: '/clubs/detail',
  COURTS: '/courts',
  COURT_FORM: '/courts/form',
  COURT_EDIT: '/courts/edit',
  COURT_MANAGEMENT: '/courts/management'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio',
  EMAIL: 'Por favor ingrese un email válido',
  MIN_LENGTH: 'Debe tener al menos {0} caracteres',
  MAX_LENGTH: 'No puede tener más de {0} caracteres',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden'
}; 