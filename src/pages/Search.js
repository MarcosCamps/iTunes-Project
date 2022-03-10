import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchButton: true,
      albums: [],
      loading: false,
      artistName: '',
      inputArtist: '',
    };

    this.buttonSearch = this.buttonSearch.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
  }

  buttonSearch(event) {
    const characterMin = 2;
    this.setState({
      artistName: event.target.value,
    });
    if (event.target.value.length >= characterMin) {
      this.setState({
        searchButton: false,
      });
    }
  }

  async searchAlbums(event) {
    const { artistName } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    const results = await searchAlbumsAPI(artistName);
    this.setState({
      albums: results,
      loading: false,
      artistName: '',
      inputArtist: artistName,
    });
    console.log(results);
  }

  render() {
    const { searchButton, artistName, loading, albums, inputArtist } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        {loading
          ? <p>Carregando...</p>
          : (
            <>
              <div>
                <form>
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    name="artistName"
                    value={ artistName }
                    placeholder="Digite a banda ou o artista"
                    onChange={ this.buttonSearch }
                  />
                  <button
                    data-testid="search-artist-button"
                    type="submit"
                    name="searchButton"
                    onClick={ this.searchAlbums }
                    disabled={ searchButton }
                  >
                    Pesquisar
                  </button>
                </form>
                <h2>
                  {`Resultado de álbuns de: ${inputArtist}`}
                </h2>
              </div>
              {albums.length <= 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <section>
                    {albums.map((album, index) => (
                      <div key={ `album-${index}` }>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          <img
                            src={ album.artworkUrl100 }
                            alt=""
                          />
                          <h3>{ album.collectionName }</h3>
                          <p>{ album.artistName }</p>
                        </Link>
                        {console.log(album.collectionId)}
                      </div>
                    ))}
                  </section>
                )}
            </>
          )}
      </div>
    );
  }
}

export default Search;
