import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spiner from '../Spiner/Spiner';

const perPage = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

const withAxios = BaseComponent => {
  return class WithAxios extends Component {
    static propTypes = {
      request: PropTypes.string.isRequired,
      page: PropTypes.number.isRequired,
      restPages: PropTypes.func.isRequired,
      hendeLoadMore: PropTypes.func.isRequired,
    };

    state = {
      data: [],
      isLoading: false,
      error: '',
      nextPageExist: false,
    };

    componentDidUpdate(prevProps) {
      const { request, page } = this.props;

      if (prevProps.request !== request || prevProps.page !== page) {
        if (request !== '') {
          if (prevProps.request !== request) this.restData();
          this.fetchArticles();
        } else {
          this.restData();
        }
      }
    }

    restData = () => {
      this.setState({ data: [] });
    };

    fetchArticles = () => {
      this.setState({ isLoading: true, error: '' });
      const { request, page, restPages } = this.props;
      const key = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `?key=${key}&image_type=photo&orientation=horizontal&q=${request}&page=${page}&per_page=${perPage}`,
        )
        .then(({ data }) => {
          if (data.hits.length !== 0) {
            const nexPages = page < data.totalHits / perPage;
            this.setState(
              state => {
                return {
                  data: [...state.data, ...data.hits],
                  error: '',
                  nextPageExist: nexPages,
                };
              },
              () => {
                const scroling =
                  document.documentElement.scrollTop +
                  document.documentElement.clientHeight;
                if (page > 1) {
                  window.scrollTo({
                    top: scroling,

                    behavior: 'smooth',
                  });
                }
              },
            );
          } else {
            restPages();
            this.setState({
              error: 'No photos found for your request ...',
              nextPageExist: false,
            });
          }
        })
        .catch(() =>
          this.setState({ error: 'server error try again later ...' }),
        )
        .finally(() => this.setState({ isLoading: false }));
    };

    render() {
      const { data, isLoading, error, nextPageExist } = this.state;
      const { hendeLoadMore } = this.props;
      return (
        <>
          {isLoading && <Spiner />}
          <BaseComponent
            data={data}
            error={error}
            nextPageExist={nextPageExist}
            hendeLoadMore={hendeLoadMore}
          />
        </>
      );
    }
  };
};

export default withAxios;
