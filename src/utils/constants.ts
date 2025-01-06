export const USER_AVATAR = 'https://avatars.dicebear.com/api/avataaars/';

export const url =
  'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};
