import React, { } from 'react';
import styled from '@emotion/styled';



const Loading = styled.div`
    margin: 0;
    color: #333;
    height : 100vh;
    display:flex;
    justify-content : center;
    align-items: center;
    z-index : 2
  `;
const H1 = styled.h1`
  font-size : 20px;
  color : #000;
  `
export default function Loader () {
    return (
        <Loading data-testid="loader">
            <H1>
                Loading.....
            </H1>
        </Loading>
    );
};
