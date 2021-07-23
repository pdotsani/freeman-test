import { useHistory } from "react-router-dom";
import queryString from "query-string";

import './SearchInput.css';

function SearchInput({ setSearchResults }) {
  const history = useHistory();
  const onSubmit = e => {
    e.preventDefault();
    const queryObj = { q: e.target["search-input"].value };
    const qString = queryString.stringify(queryObj);
    history.push(`/search?${qString}`);
  }
  const onClear = () => {
    document.getElementById("search-input").value = "";
    history.push('/');
  }
  return(
    <div className="search-input__container">
      <form onSubmit={onSubmit}>
        <input id="search-input" type="text" />
      </form>
      <button onClick={onClear}>Clear</button>
    </div>
  )
}

export default SearchInput;