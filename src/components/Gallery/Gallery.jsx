import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Gallery.module.css';
import PhotoCard from '../PhotoCard/PhotoCard';
import withAxios from '../HOC/withAxios';

class Gallery extends Component {
  state = {};

  render() {
    const { data, error, nextPageExist, hendeLoadMore } = this.props;

    return (
      <>
        {error === '' ? (
          <ul className={css.gallery}>
            {data.map(
              ({
                id,
                webformatURL,
                largeImageURL,
                likes,
                views,
                comments,
                downloads,
                tags,
              }) => (
                <PhotoCard
                  key={id}
                  image={{
                    id,
                    webformatURL,
                    largeImageURL,
                    likes,
                    views,
                    comments,
                    downloads,
                    tags,
                  }}
                />
              ),
            )}
          </ul>
        ) : (
          <h2 className={css.error}>{error}</h2>
        )}
        {nextPageExist && (
          <button type="button" className={css.button} onClick={hendeLoadMore}>
            load more...
          </button>
        )}
      </>
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string.isRequired,
  nextPageExist: PropTypes.bool.isRequired,
  hendeLoadMore: PropTypes.func.isRequired,
};
export default withAxios(Gallery);
