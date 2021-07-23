import { useEffect, useState } from 'react';
import { withRouter, Link } from "react-router-dom";

import './SearchBody.css';
 
function SearchBody({ location }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetch(`/api/movies/search${location.search}`).then(async result => {
        const bodyResponse = await result.json();
        console.log("search ", bodyResponse);
        setSearchResults(bodyResponse.results);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false);
      })
    })();
  }, [location.search])
  return(
    <div>
      {
        loading ? 
        (<div>Loading...</div>) :
        (<div className="searchbody__container">
          {
            searchResults.map((movie, idx) => (
              <Link 
                key={`${movie.original_title}-${idx}`}
                className="searchbody__movie-div"
                to={`/movie/${movie.id}`}>
                {movie.original_title}
              </Link>
            ))
          }
        </div>)
      }
    </div>
  )
}

export default withRouter(SearchBody);
