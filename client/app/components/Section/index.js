/**
 *
 * Section
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Section = ({ name, description, style, className, children, h3 }) => (
  <section className={className} style={style}>
    <div class="heading-wrapper">
      {h3 ? <h3>{name}</h3> : <h2>{name}</h2>}

      <p>
        {description}
      </p>
    </div>

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
    color: grey;
  }

  h3 {
    color: grey;
  }

  .heading-wrapper {
    border-bottom: 1px solid grey;
    color: grey;
    margin-bottom: 20px;
  }
`;

export default StyledSection;
