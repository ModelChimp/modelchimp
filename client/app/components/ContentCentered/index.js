import styled from 'styled-components';
import { Layout } from 'antd';

const ContentCentered = styled(Layout.Content)`
  max-width: calc(900px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default ContentCentered;
