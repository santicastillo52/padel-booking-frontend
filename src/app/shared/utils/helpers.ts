import { STORAGE_KEYS } from './constants';

/**
 * Obtiene el token de autenticación del localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

/**
 * Guarda el token de autenticación en localStorage
 */
export function setToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

/**
 * Elimina el token de autenticación del localStorage
 */
export function removeToken(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Obtiene la información del usuario del localStorage
 */
export function getUser(): any {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Guarda la información del usuario en localStorage
 */
export function setUser(user: any): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

/**
 * Elimina la información del usuario del localStorage
 */
export function removeUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

/**
 * Limpia toda la información de autenticación
 */
export function clearAuth(): void {
  removeToken();
  removeUser();
}

/**
 * Formatea una fecha para mostrar en la interfaz
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea una hora para mostrar en la interfaz
 */
export function formatTime(time: string): string {
  return time.substring(0, 5); // Extrae HH:MM de HH:MM:SS
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Valida si un email tiene formato válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitaliza la primera letra de una cadena
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
} 