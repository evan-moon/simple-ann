import './App.css';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Network from './components/Network';
import Loss from './components/Loss';
import Output from './components/Output';
import ControlPanel from './components/ControlPanel';
import { Container, Row, Col } from 'react-bootstrap';
import { AppState } from './reducers';

type Props = {
  storeState: AppState;
};

const App: React.FC<Props> = (props) => {
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
            <ControlPanel />
          </Col>
          <Col xs={12}>
            <div id="network-display" className="border-box">
              <h3>Network</h3>
              {nodeGraphicData ? <Network nodes={nodeGraphicData.nodes} links={nodeGraphicData.links} /> : null}
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div id="loss-rate-chart" className="chart-wrapper border-box">
              <h3>Error Loss</h3>
              {errorDataset ? <Loss losses={errorDataset} /> : null}
            </div>
          </Col>
          <Col xs={12} xl={6}>
            <div id="output-chart" className="chart-wrapper border-box">
              <h3>Outputs</h3>
              {outputDataset ? <Output outputs={outputDataset}/> : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: AppState): Props => {
  return {
    storeState: state,
  };
};

export default connect(mapStateToProps)(App);
