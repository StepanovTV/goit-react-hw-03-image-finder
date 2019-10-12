import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    value: '',
  };

  hendelChenge = ({ target }) => {
    this.setState({ value: target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { hendelSerch } = this.props;
    const { value } = this.state;
    hendelSerch(value);
  };

  render() {
    const { value } = this.state;

    return (
      <form className={css.searchForm} onSubmit={this.onSubmit}>
        <input
          type="text"
          autoComplete="off"
          value={value}
          onChange={this.hendelChenge}
          placeholder="Search images..."
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  hendelSerch: PropTypes.func.isRequired,
};
export default SearchForm;
