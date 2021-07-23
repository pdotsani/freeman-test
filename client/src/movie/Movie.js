import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import './Movie.css';

function MovieView({ match }) {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("match ", match.params.movieId);
    setLoading(true);
    (async () => {
      await fetch(`/api/movie/${match.params.movieId}`).then(async result => {
        const bodyResponse = await result.json();
        console.log("search ", bodyResponse);
        setMovieData(bodyResponse);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      })
    })();
  }, [match.params.movieId]);
  return(
    <>
      {
        loading ? (<div>loading...</div>) :
        (<div className="movie__container">
          {movieData.backdrop_path && <img src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`} />}
          <div>{movieData.original_title}</div>
          <div>{movieData.release_date}</div>
          <div>{movieData.overview}</div>
        </div>)
      }
    </>
  )
}

export default withRouter(MovieView);
