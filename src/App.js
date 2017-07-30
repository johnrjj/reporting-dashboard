// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  GradientDefs,
  Hint,
  makeWidthFlexible,
  makeHeightFlexible,
  YAxis,
  MarkSeries,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';
import styled from 'styled-components';

// https://stackoverflow.com/questions/28623446/expand-bottom-border-on-hover
const FlexibleXYPlot = makeHeightFlexible(makeWidthFlexible(XYPlot));

const colorPalette = {
  white: '#fff',
  offwhite: '#F4F5F6',
  lightGray: '#DFE3E8',
  gray: '#EFEFEF',
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
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${colorPalette.white};
  border: 1px solid ${colorPalette.gray};
`;

const MenuOption = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  margin: 8px;
  :after {
    display: block;
    content: '';
    border-bottom: solid 3px #019fb6;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :before {
    display: block;
    content: '';
    border-bottom: solid 3px #019fb6;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: scaleX(1);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colorPalette.offwhite};
`;

const OptionsToolbar = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartTitleContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 48px;
`;

const ChartTitle = styled.h1`
  text-align: center;
  font-size: 48px;
  font-weight: 300;
`;

const ChartSummariesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 64px;
`;

const ChartSummary = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colorPalette.gray};
  height: 128px;
  padding: 16px 48px;
  width: 256px;
  border-bottom: 3px solid ${colorPalette.green};
`;

const ChartSummaryMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ChartSummarySecondaryContainer = styled.div``;

const ChartSummaryPrimaryNumber = styled.div`
  display: flex;
  font-size: 64px;
  font-weight: 300;
  color: ${colorPalette.green};
`;

const ChartSummaryPrimaryDescription = styled.div`
  display: flex;
  color: black;
  font-size: 24px;
  width: 100px;
  clear: both;
  margin-left: 16px;
  word-wrap: break-word;
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
  state = {
    value: false,
  };

  render() {
    return (
      <AppContainer>
        <Header>
          <MenuOption>meow</MenuOption>
          <MenuOption>test1</MenuOption>
          <MenuOption>test2</MenuOption>
          <MenuOption>test3</MenuOption>
        </Header>
        <ContentContainer>
          <OptionsToolbar />
          <ChartTitleContainer>
            <ChartTitle>Analytics Report</ChartTitle>
          </ChartTitleContainer>
          <ChartSummariesContainer>
            <ChartSummary>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber>67</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  People Enrolled
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
            <ChartSummary>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber>51%</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  Completion Performed
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
            <ChartSummary>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber>33%</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  Issues Reported
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
          </ChartSummariesContainer>
          <FlexibleXYPlot
            xDomain={[0, 20]}
            yDomain={[0, 20]}
            onMouseLeave={() => this.setState({ value: false })}
          >
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
              animation={true}
              color={'url(#customGradient)'}
              className="mark-series-example"
              sizeRange={[5, 15]}
              onNearestXY={value => this.setState({ value })}
              data={myData}
            />
            {this.state.value ? <Hint value={this.state.value} /> : null}
            <XAxis title="Dates" />
            <YAxis title="Days" />
          </FlexibleXYPlot>
        </ContentContainer>
      </AppContainer>
    );
  }
}

export default App;
