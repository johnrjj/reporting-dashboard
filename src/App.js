// @flow
import React, { Component } from 'react';
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
import moment from 'moment';
import testData from './data.json';

const parsedData = testData.map(d => {
  const parsedData = moment(d.x);
  const date = parsedData.toDate();
  const res = { ...d, x: date, size: 0.5 };
  return res;
});

const FlexibleXYPlot = makeHeightFlexible(makeWidthFlexible(XYPlot));

const colorPalette = {
  white: '#fff',
  offwhite: '#F4F5F6',
  lightGray: '#DFE3E8',
  gray: '#E7E7E7',
  darkGray: '#BBC0C6',
  veryDarkGray: '#585858',
  lightBlue: '#C8DAE5',
  green: '#8EC741',
  hotPink: '#FE387B',
  blue: '#95C6F3',
  deepBlue: '#4291E3',
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

const MenuOptionContainer = styled.div`
  align-items: center;
  border-bottom: ${props =>
    props.active ? `solid 6px ${colorPalette.deepBlue}` : 'none'};
  :after {
    display: block;
    content: '';
    border-bottom: solid 3px ${colorPalette.lightBlue};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :before {
    display: block;
    content: '';
    border-bottom: solid 3px ${colorPalette.lightBlue};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: ${props => (props.active ? 'scale(0)' : 'scaleX(1)')};
  }
`;

const MenuOption = styled.div`
  color: ${props => (props.active ? `inherit` : `${colorPalette.darkGray}`)};
  text-transform: uppercase;
  font-size: 20px;
  text-align: center;
  letter-spacing: 1px;
  font-weight: 500;
  height: 100%;
  display: inline-block;
  cursor: pointer;
  margin: 32px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colorPalette.offwhite};
`;

const OptionsToolbar = styled.div`
  height: 92px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin: 0 32px 32px 32px;
  border-bottom: 2px solid ${colorPalette.gray};
`;

const ToolbarOptionContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: ${props =>
    props.active ? `solid 3px ${colorPalette.blue}` : 'none'};
  :after {
    display: block;
    content: '';
    border-bottom: solid 3px ${colorPalette.lightBlue};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :before {
    display: block;
    content: '';
    border-bottom: solid 3px ${colorPalette.lightBlue};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: ${props => (props.active ? 'scale(0)' : 'scaleX(1)')};
  }
`;

const ToolbarOption = styled.div`
  color: ${props => (props.active ? `inherit` : `${colorPalette.darkGray}`)};
  text-transform: uppercase;
  font-size: 16px;
  margin: 16px;
  text-align: center;
  font-weight: 500;
  display: inline-block;
  cursor: pointer;
`;

const ChartTitleContainer = styled.div`margin-bottom: 48px;`;

const ChartTitle = styled.div`
  text-align: center;
  font-size: 48px;
  font-weight: 300;
`;

const ChartSummariesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 48px;
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
  border-bottom: 3px solid
    ${props => (props.blue ? colorPalette.deepBlue : colorPalette.green)};
`;

const ChartSummaryMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ChartSummarySecondaryContainer = styled.div`
  opacity: 0.9;
  text-transform: uppercase;
  color: ${colorPalette.darkGray};
`;

const ChartSummaryPrimaryNumber = styled.div`
  display: flex;
  font-size: 64px;
  font-weight: 300;
  color: ${props => (props.blue ? colorPalette.deepBlue : colorPalette.green)};
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

const ChartContainer = styled.div`
  margin: 0 32px;
  flex: 1;
`;

const Footer = styled.div`
  height: 64px;
  width: 100%;
`;

const myData = [
  { x: 1, y: 10, size: 30 },
  { x: 1.7, y: 12, size: 10 },
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
          <MenuOptionContainer active>
            <MenuOption active>Scatterplot</MenuOption>
          </MenuOptionContainer>
          <MenuOptionContainer>
            <MenuOption>Histogram</MenuOption>
          </MenuOptionContainer>
          <MenuOptionContainer>
            <MenuOption>Line Chart</MenuOption>
          </MenuOptionContainer>
        </Header>
        <ContentContainer>
          <OptionsToolbar>
            <ToolbarOptionContainer active>
              <ToolbarOption active>Last 30 Days</ToolbarOption>
            </ToolbarOptionContainer>
            <ToolbarOptionContainer>
              <ToolbarOption>Last 7 days</ToolbarOption>
            </ToolbarOptionContainer>
            <ToolbarOptionContainer>
              <ToolbarOption>Yesterday</ToolbarOption>
            </ToolbarOptionContainer>
          </OptionsToolbar>
          <ChartTitleContainer>
            <ChartTitle>Cycle Time Report</ChartTitle>
          </ChartTitleContainer>
          <ChartSummariesContainer>
            <ChartSummary blue>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber blue>305</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  Items Completed
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
            <ChartSummary>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber>16</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  Day Cycletime
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
            <ChartSummary blue>
              <ChartSummaryMainContainer>
                <ChartSummaryPrimaryNumber blue>22</ChartSummaryPrimaryNumber>
                <ChartSummaryPrimaryDescription>
                  Days remaining
                </ChartSummaryPrimaryDescription>
              </ChartSummaryMainContainer>
              <ChartSummarySecondaryContainer>
                +14% since last week
              </ChartSummarySecondaryContainer>
            </ChartSummary>
          </ChartSummariesContainer>
          <ChartContainer>
            <FlexibleXYPlot
              xType={'time'}
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
                  <stop
                    offset="0%"
                    stopColor={colorPalette.blue}
                    stopOpacity="1"
                  />
                  <stop
                    offset="85%"
                    stopColor={'rgb(142,199,65)'}
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor={'rgb(254,56,123)'}
                    stopOpacity="1"
                  />
                </linearGradient>
              </GradientDefs>

              <HorizontalGridLines />

              <MarkSeries
                animation={true}
                style={{
                  strokeWidth: 0.5,
                  opacity: 0.9,
                }}
                color={'url(#customGradient)'}
                onNearestXY={value =>
                  console.log(value) || this.setState({ value })}
                data={parsedData}
              />
              {this.state.value
                ? <Hint
                    value={{
                      ...this.state.value,
                      x: moment(this.state.value.x).format(),
                    }}
                  />
                : null}
              <XAxis title="Dates" />
              <YAxis title="Days" />
            </FlexibleXYPlot>
          </ChartContainer>
          <Footer />
        </ContentContainer>
      </AppContainer>
    );
  }
}
console.log(testData);
export default App;
