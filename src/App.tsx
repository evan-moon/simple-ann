import './App.css';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NetworkView from './components/NetworkView/NetworkView';
import LossView from './components/LossView/LossView';
import OutputView from "./components/OutputView/OutputView";
import { Container, Row, Col } from 'react-bootstrap';
import ControlPanel from './components/ControlPanel';

interface AppProps {
  storeState: any;
};

const App: React.FC<AppProps> = (props) => {
  const { storeState } = props;
  const {
    inputs,
    targets,
    nodeGraphicData,
    errorDataset,
    outputDataset,
    learningResult,
    totalLoss
  } = storeState;

  useEffect(() => {
    console.log('============================== Result ==================================');
    console.log(`Loss: ${totalLoss}`);
    console.log(`Inputs: [${inputs}]`);
    console.log(`Outputs: [${learningResult}]`);
    console.log(`Targets: [${targets}]`);
    console.log('========================================================================');
  });

  return (
    <div className="App">
      <Container fluid={true}>
        <Row noGutters={true}>
          <Col xs={12}>
            <h3>Controller</h3>
            <ControlPanel />
          </Col>
          <Col xs={12}>
            <div id="network-display" className="border-box">
              <h3>Network</h3>
              {nodeGraphicData ? <NetworkView nodes={nodeGraphicData.nodes} links={nodeGraphicData.links} /> : null}
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div id="loss-rate-chart" className="chart-wrapper border-box">
              <h3>Error Loss</h3>
              {errorDataset ? <LossView losses={errorDataset} /> : null}
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div id="output-chart" className="chart-wrapper border-box">
              <h3>Outputs</h3>
              {outputDataset ? <OutputView outputs={outputDataset}/> : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: any): AppProps => {
  return {
    storeState: state,
  };
};

export default connect(mapStateToProps)(App);
