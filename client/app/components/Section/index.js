/**
 *
 * Section
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Section = ({name, style, className, children}) => {
  return <section className={className} style={style}>
    <h2>{name}</h2>
    {children}
  </section>;
}

const StyledSection = styled(Section)`
  margin-top:30px;

  h2 {
    border-bottom:1px solid grey;
    color:grey;
  }
`;

export default StyledSection;
