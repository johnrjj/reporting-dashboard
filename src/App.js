// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  GradientDefs,
  makeWidthFlexible,
  YAxis,
  MarkSeries,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';
import styled from 'styled-components';

// https://stackoverflow.com/questions/28623446/expand-bottom-border-on-hover
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const colorPalette = {
  white: '#fff',
  offwhite: '#F4F5F6',
  lightGray: '#DFE3E8',
  darkGray: '#BBC0C6',
  veryDarkGray: '#585858',
  lightBlue: '#C8DAE5',

  green: '#8EC741',
  hotPink: '#FE387B',
  // #28A1F3
  blue: '#93CAF0',
  deepBlue: '#1F7DF1',
  lightYellow: '#E2E2D0',
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  height: 64px;
  display: flex;
  width: 100%;
  background-color: ${colorPalette.white};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  background-color: ${colorPalette.offwhite};
`;

const Footer = styled.div`
  height: 64px;
  width: 100%;
`;

const myData = [
  { x: 1, y: 10, size: 30 },
  { x: 1.7, y: 12, size: 10 },
  { x: 15, y: 20, size: 5 },
  { x: 15, y: 17, size: 5 },

  { x: 2, y: 5, size: 1 },
  { x: 3, y: 15, size: 12 },
  { x: 2.5, y: 7, size: 4 },
];

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Header />
        <Content>
          <FlexibleXYPlot xDomain={[0, 20]} yDomain={[0, 20]} height={300}>
            <GradientDefs>
              <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="red" stopOpacity={0.4} />
                <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="myGradient" gradientUnits="userSpaceOnUse">
                <stop offset="10%" stopColor="#c6e48b" />
                <stop offset="33%" stopColor="#7bc96f" />
                <stop offset="66%" stopColor="#239a3b" />
                <stop offset="90%" stopColor="#196127" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="customGradient"
                x1="50%"
                y1="100%"
                x2="50%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgb(142,199,65)" stopOpacity="1" />
                <stop
                  offset="85%"
                  stopColor="rgb(142,199,65)"
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(254,56,123)"
                  stopOpacity="1"
                />
              </linearGradient>
            </GradientDefs>

            <HorizontalGridLines />

            <MarkSeries
              color={'url(#customGradient)'}
              className="mark-series-example"
              sizeRange={[5, 15]}
              data={myData}
            />
            <XAxis title="Dates" />
            <YAxis title="Days" />
          </FlexibleXYPlot>
        </Content>
      </AppContainer>
    );
  }
}

export default App;
