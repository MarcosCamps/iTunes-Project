import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      imgAlbum: '',
      loading: false,
      favoriteSongs: [],
    };

    this.handleMusic = this.handleMusic.bind(this);
    this.checkedSongs = this.checkedSongs.bind(this);
  }

  componentDidMount() {
    this.handleMusic();
    this.checkedSongs();
  }

  async handleMusic() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      musics: result,
      nameArtist: result[0].artistName,
      nameAlbum: result[0].collectionName,
      imgAlbum: result[0].artworkUrl100,
    });
  }

  checkedSongs() {
    this.setState({
      loading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: favorites,
      });
    });
  }

  render() {
    const {
      musics,
      nameArtist,
      nameAlbum,
      imgAlbum,
      favoriteSongs,
      loading,
    } = this.state;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <Header />
        {loading
          ? <p>Carregando...</p>
          : (
            <div>
              <h3 data-testid="artist-name">{ nameArtist }</h3>
              <h3 data-testid="album-name">{` ${nameAlbum} - ${nameArtist}` }</h3>
              <img src={ imgAlbum } alt={ nameAlbum } />
              <hr />
              {musics.map(({ trackName, previewUrl, trackId }, index) => {
                if (index === 0) {
                  return '';
                }
                return (
                  <MusicCard
                    key={ trackId }
                    trackId={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    song={ favoriteSongs.some((el) => (el.trackId === trackId)) }
                  />);
              })}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
