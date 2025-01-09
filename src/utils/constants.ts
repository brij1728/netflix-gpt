export const USER_AVATAR = 'https://avatars.dicebear.com/api/avataaars/';

export const url =
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export const LINKEDIN_URL = 'https://www.linkedin.com/in/brijeshapp/';
