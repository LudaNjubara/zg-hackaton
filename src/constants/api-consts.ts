import { APP_BACKEND_URL } from "./app-consts";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${APP_BACKEND_URL}/users/login`,
    REGISTER: `${APP_BACKEND_URL}/users/register`,
    LOGOUT: `${APP_BACKEND_URL}/users/logout`,
    REFRESH: `${APP_BACKEND_URL}/auth/refresh`,
    TEST: `${APP_BACKEND_URL}/example/test-authenticated`,
  },
  EVENT: {
    GET_EVENTS: `${APP_BACKEND_URL}/events`,
    RECENTLY_VIEWED: {
      GET: `${APP_BACKEND_URL}/events/recently-viewed`,
      GET_ALL: `${APP_BACKEND_URL}/events/recently-viewed/all`
    },
    FAVORITES: {
      GET: `${APP_BACKEND_URL}/events/favorites`,
      GET_ALL: `${APP_BACKEND_URL}/events/favorites/all`,
      UPDATE: `${APP_BACKEND_URL}/events/favorites/update`,
    },
    SEARCH: {
      GET_ALL: `${APP_BACKEND_URL}/events/search`,
    },
    CATEGORIES: {
      GET_ALL: `${APP_BACKEND_URL}/event-categories`,
    },
  },
  USER: {
    GET: `${APP_BACKEND_URL}/users/user-info`,
    CREATE: `${APP_BACKEND_URL}/user/create`,
    UPDATE: `${APP_BACKEND_URL}/user/update`,
    DELETE: `${APP_BACKEND_URL}/user/delete`,
    FAVORITES: `${APP_BACKEND_URL}/users/favorites`,
    TESTUSER : `${APP_BACKEND_URL}/users/generate-test-user`
  },
} as const;
