import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchButton: true,
    };

    this.buttonArtist = this.buttonArtist.bind(this);
  }

  buttonArtist(event) {
    const characterMin = 2;
    if (event.target.value.length >= characterMin) {
      this.setState({
        searchButton: false,
      });
    }
  }

  render() {
    const { searchButton } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="artist-name"
            placeholder="Digite a banda ou o artista"
            onChange={ this.buttonArtist }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            name="searchButton"
            // onClick={ }
            disabled={ searchButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
