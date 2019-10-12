import React, { Component } from 'react';
import css from './ImagesSearch.module.css';
import SearchForm from '../SearchForm/SearchForm';
import Gallery from '../Gallery/Gallery';

class ImagesSearch extends Component {
  state = {
    currentPage: 1,
    currentRequest: '',
  };

  hendelSerch = value => {
    const { currentRequest } = this.state;
    if (currentRequest === value) return;
    this.setState({ currentRequest: value.trim() });
    this.restPages();
  };

  restPages = () => this.setState({ currentPage: 1 });

  hendeLoadMore = () =>
    this.setState(({ currentPage }) => {
      return { currentPage: currentPage + 1 };
    });

  render() {
    const { currentPage, currentRequest } = this.state;
    return (
      <section className={css.app}>
        <SearchForm hendelSerch={this.hendelSerch} />
        {!currentRequest && (
          <h2 className={css.heloText}>Enter a request to display images...</h2>
        )}
        <Gallery
          request={currentRequest}
          page={currentPage}
          restPages={this.restPages}
          hendeLoadMore={this.hendeLoadMore}
        />
      </section>
    );
  }
}

export default ImagesSearch;
