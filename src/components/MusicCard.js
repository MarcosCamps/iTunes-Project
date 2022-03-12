import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      loading: false,
    };
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  checkFavorite({ target }) {
    this.setState({
      isChecked: target.checked,
      loading: true,
    }, async () => {
      const { trackName, previewUrl, trackId } = this.props;
      const musics = {
        trackName,
        previewUrl,
        trackId,
      };
      await addSong(musics);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId, song } = this.props;
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
                checked={ song }
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
  trackId: PropTypes.number.isRequired,
  song: PropTypes.bool.isRequired,
};

export default MusicCard;
