import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import './Movie.css';

function MovieView({ match }) {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetch(`/api/movie/${match.params.movieId}`).then(async result => {
        const bodyResponse = await result.json();
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
          {movieData.poster_path && <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} style={{ width: "50%" }} />}
          <div className="movie__details">
            <div>{movieData.original_title}</div>
            <div>{movieData.release_date}</div>
            <div>{movieData.overview}</div>
          </div>
        </div>)
      }
    </>
  )
}

export default withRouter(MovieView);
