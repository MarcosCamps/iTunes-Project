import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      loading: false,
    };

    this.checkFavorite = this.checkFavorite.bind(this);
  }

  async checkFavorite({ target }) {
    this.setState({
      isChecked: target.checked,
      loading: true,
    });
    const { trackId } = this.props;
    const musics = await getMusics(trackId);
    await addSong(musics);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <div>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading
          ? <p>Carregando...</p>
          : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                value={ isChecked }
                name={ trackName }
                onChange={ this.checkFavorite }
                checked={ isChecked }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
