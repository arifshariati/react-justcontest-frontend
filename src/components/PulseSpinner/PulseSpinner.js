import React, { Component } from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

const override = css`
  display: block;
  margin: auto auto;
  border-color: red;
`;

export class PulseSpinner extends Component {
    render() {
        return (
            <div className="sweet-loading">
                <PulseLoader
                    css={override}
                    size={15}
                    color={"#ff5722"}
                    loading={true}
                />
            </div>
        )
    }
}

export default PulseSpinner
