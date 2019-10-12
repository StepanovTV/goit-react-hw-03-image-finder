import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = { on: false };

  handleKeyPress = e => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 27) {
      this.open();
      e.preventDefault();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget && target !== currentTarget) {
      return;
    }

    this.open();
  };

  open = () => {
    const { on } = this.state;
    this.setState({ on: !on });
  };

  render() {
    const { children } = this.props;
    const { on } = this.state;

    return (
      <>
        {children({
          on,
          open: this.open,
          backdropClick: this.handleBackdropClick,
          handleKeyPress: this.handleKeyPress,
        })}
      </>
    );
  }
}

export default Modal;
