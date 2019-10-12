import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import css from './PhotoCard.module.css';

const PhotoCard = ({ image }) => {
  return (
    <li className={css.gallery_item}>
      <div className={css.photoCard}>
        <img src={image.webformatURL} alt={image.tags} />

        <div className={css.stats}>
          <p className={css.statsItem}>
            <i className="material-icons">thumb_up</i>
            {image.likes}
          </p>
          <p className={css.statsItem}>
            <i className="material-icons">visibility</i>
            {image.views}
          </p>
          <p className={css.statsItem}>
            <i className="material-icons">comment</i>
            {image.comments}
          </p>
          <p className={css.statsItem}>
            <i className="material-icons">cloud_download</i>
            {image.downloads}
          </p>
        </div>

        <Modal>
          {({ on, open, backdropClick, handleKeyPress }) => (
            <div>
              <button
                type="button"
                onClick={open}
                className={css.fullscreen_button}
              >
                <i className="material-icons">zoom_out_map</i>
              </button>
              {on && (
                <div
                  role="toolbar"
                  aria-label="Закрыть"
                  tabIndex={-1}
                  className={css.modal_overlay}
                  onClick={backdropClick}
                  onKeyUp={e => handleKeyPress(e)}
                >
                  <div className={css.modal}>
                    <button
                      onClick={open}
                      autoFocus
                      type="button"
                      aria-label="Закрыть"
                      className={css.close}
                    >
                      <span className="material-icons">close</span>
                    </button>
                    <img
                      className={css.fullImg}
                      src={image.largeImageURL}
                      alt={image.tags}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </li>
  );
};

PhotoCard.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
      downloads: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default PhotoCard;
