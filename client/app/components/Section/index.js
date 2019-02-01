/**
 *
 * Section
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Section = ({ name, style, className, children, h3 }) => (
  <section className={className} style={style}>
    {h3 ? <h3>{name}</h3> : <h2>{name}</h2>}
    {children}
  </section>
);

Section.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  h3: PropTypes.bool,
};

const StyledSection = styled(Section)`
  margin-top: 30px;

  h2 {
    border-bottom: 1px solid grey;
    color: grey;
  }

  h3 {
    border-bottom: 1px solid grey;
    color: grey;
  }
`;

export default StyledSection;
