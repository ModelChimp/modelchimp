/**
 *
 * Asset Drawer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Table, Tag, Icon, Drawer } from 'antd';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectAssetBlob } from './selectors';
import {loadAssetBlob} from './actions';
import { isTextExtension, isImageExtension } from 'utils/filePath';


/* eslint-disable react/prefer-stateless-function */
export class AssetDrawer extends React.Component {
  render() {
    if(isImageExtension(this.props.assetUrl)){
      return <img src={this.props.assetUrl} style={this.props.style} />;
    }

    if(isTextExtension(this.props.assetUrl)){
      const textData = this.props.assetBlobData;

      return <textarea style={{
        boxSizing:'border-box',
        width: '100%',
        height: '100vh',
        fontFamily: 'Menlo, Consolas, monospace'
      }}
      value = { textData ? textData.asset_blob: ''}
      readOnly={true}
      />;
    }

    return <div>The file is corrupted</div>;
  }
}

AssetDrawer.propTypes = {
  assetBlobData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assetBlobData: makeSelectAssetBlob(),
});

export default connect(
  mapStateToProps,
  null
)(AssetDrawer);
