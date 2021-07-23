import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './Popular.css';

function Popular() {
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    (async () => {
        await setLoading(true);
        await fetch("/api/movies/popular").then(async result => {
          const bodyResponse = await result.json();
          setPopular(bodyResponse.results);
        }).catch((error) => {
          console.error(error);
        }).finally(() => {
          setLoading(false);
        })
      }
    )();
  }, [])
  return(
    <div>
      { loading ? <div>loading...</div> :
        <div className="popular__container">
          <h2 className="popular__header">Popular Movies</h2>
          {
            popular.map(movie => (
              <Link 
                key={movie.original_title}
                className="popular__movie-div" 
                to={`/movie/${movie.id}`}>
                  <span className="popular__movie-span">{movie.original_title}</span>
              </Link>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Popular;
