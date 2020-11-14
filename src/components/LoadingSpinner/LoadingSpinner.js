import React, { Component } from 'react';
import { css } from '@emotion/core';
import RiseLoader from 'react-spinners/RiseLoader';

const override = css`
  
  margin: auto auto;
  border-color: red;
  position:fixed;
  top:50%;
  left:50%;
`;

export class LoadingSpinner extends Component {
    render() {
        return (
            <div className="sweet-loading">
                <RiseLoader
                    css={override}
                    size={50}
                    color={"#ff5722"}
                    loading={true}
                />
            </div>
        )
    }
}

export default LoadingSpinner
