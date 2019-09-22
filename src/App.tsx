import './App.css';

import React, { createRef } from 'react';
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

class App extends React.Component<Props> {

  // 부모가 자식에게 접근하는 안티패턴. 추후 컨테이너 만들 때 액션으로 옮길 것
  networkRef: any = createRef();
  errorChartRef: any = createRef();
  outputChartRef: any = createRef();

  printResult () {
    const { storeState: state } = this.props;
    console.log('============================== Result ==================================');
    console.log(`Loss: ${state.totalLoss}`);
    console.log(`Inputs: [${state.inputs}]`);
    console.log(`Outputs: [${state.learningResult}]`);
    console.log(`Targets: [${state.targets}]`);
    console.log('========================================================================');
  }

  componentDidMount () {
    this.printResult();
  }

  componentDidUpdate () {
    // 안티패턴
    this.networkRef.current.init();
    this.errorChartRef.current.init();
    this.outputChartRef.current.init();
    this.printResult();
  }

  render () {
    const { storeState: state } = this.props;
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
                <Network ref={this.networkRef} nodes={state.nodeGraphicData.nodes} links={state.nodeGraphicData.links} />
              </div>
            </Col>
            <Col xs={12} xl={6}>
              <div id="loss-rate-chart" className="chart-wrapper border-box">
                <h3>Error Loss</h3>
                <Loss ref={this.errorChartRef} losses={state.errorDataset} />
              </div>
            </Col>
            <Col xs={12} xl={6}>
              <div id="output-chart" className="chart-wrapper border-box">
                <h3>Outputs</h3>
                <Output ref={this.outputChartRef} outputs={state.outputDataset}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

const mapStateToProps = (state: AppState): Props => {
  return {
    storeState: state,
  };
};

export default connect(mapStateToProps)(App);
