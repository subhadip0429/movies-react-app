import React from 'react';
import PropTypes from 'prop-types';
import './LoadMoreBtn.styles.css';

const LoadMoreBtn = ({ text, onClick }) => (
  <div className="rmdb-loadmorebtn" onClick={onClick}>
    <h6>{text}</h6>
  </div>
)

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default LoadMoreBtn;
