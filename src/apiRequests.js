import axios from "axios";

export const API_KEY =  "1cc46a385d6ec1e83b814000f31e551c";

export const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});
export const endPoints = {
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  MoviesBanner: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  trendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  ShowsBanner: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  trendingShows: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  search: `/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&region=US&query=`
};

export const RouteAPI = axios.create({
  baseURL: "https://route-egypt-api.herokuapp.com"
});
export const RouteEndPoints = {
  signup: "/signup",
  signin: "/signin",
  signOut: "/signOut",
  getAllUsers: "/getAllUsers?page=1",
};