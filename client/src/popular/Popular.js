import { useEffect, useState } from 'react';

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
        popular.map(movie => (
          <div key={movie.original_title}>
            {movie.original_title}
          </div>
        ))
      }
    </div>
  )
}

export default Popular;
