// For local development:
// export const BASE_URL = 'http://localhost:5001/api';

// For production (when deploying):
export const BASE_URL = 'https://elanettodesign-api.onrender.com/api';

export const REGISTER_URL = `${BASE_URL}/users/register`;
export const LOGIN_URL = `${BASE_URL}/users/login`;
export const ADDRESS_URL = `${BASE_URL}/addresses`;
export const USER_ADDRESSES_URL = `${ADDRESS_URL}/me`;
export const USER_DEFAULT_ADDRESS_URL = `${ADDRESS_URL}/me/default`;
