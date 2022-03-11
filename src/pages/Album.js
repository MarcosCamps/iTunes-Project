import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      imgAlbum: '',
    };

    this.handleMusic = this.handleMusic.bind(this);
  }

  componentDidMount() {
    this.handleMusic();
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
    console.log(result);
  }

  render() {
    const { musics, nameArtist, nameAlbum, imgAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <Header />
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
            />);
        })}
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
