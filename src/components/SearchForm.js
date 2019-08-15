import React from "react";

function SearchForm({ onSubmit, onChange, value }) {
  return (
    <form className="searchForm" onSubmit={onSubmit}>
      <div className="input-field">
        <input
          placeholder="i.e. Bourne Identity"
          id="search"
          type="text"
          className="validate"
          value={value}
          onChange={onChange}
        />
        <label htmlFor="search">Search for a movie</label>
        <i className="material-icons search-button" onClick={onSubmit}>
          search
        </i>
      </div>
    </form>
  );
}

export default SearchForm;
