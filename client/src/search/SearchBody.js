import { useEffect, useState } from 'react';
import { withRouter, Link } from "react-router-dom";
 
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
        searchResults.map((movie, idx) => (
          <Link key={`${movie.original_title}-${idx}`} to={`/movie/${movie.id}`}>
            {movie.original_title}
          </Link>
        ))
      }
    </div>
  )
}

export default withRouter(SearchBody);
