import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_MOVIEDB_BASE_URL

export const getMovies = async(movieName,page)=>{
  try {
    const {data} = await axios.get(`/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${movieName}&page=${page}&include_adult=false`)
    return data
  } catch (error) {
    console.error(error)
    return {error:error}
  }
}
