import React, { Component } from 'react';
import { css } from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: auto auto;
  border-color: red;
`;

export class DotSpinner extends Component {
    render() {
        return (
            <div className="sweet-loading">
                <DotLoader
                    css={override}
                    size={100}
                    color={"#ff5722"}
                    loading={true}
                />
            </div>
        )
    }
}

export default DotSpinner
