import './index.css';
import React, { FormEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { Form, Col, FormControlProps, Button } from 'react-bootstrap';
import bootstrapper from '../../lib/bootstrapper';
import { getTargets } from '../../utils';

// 나중에 Container로 분리할 것
import { setLearningLimit, setNodePerLayer, setLearningRate, setLayerCount } from '../../actions';

const mapStateToProps = (state: AppState) => {
  const { learningRate, learningLimit, nodePerLayer, layerCount } = state;
  return {
    learningRate: learningRate.toString(),
    learningLimit: learningLimit.toString(),
    nodePerLayer: nodePerLayer.toString(),
    layerCount: layerCount.toString(),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    setNodePerLayer,
    setLayerCount,
    setLearningRate,
    setLearningLimit,
  }, dispatch);
};

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
type State = {
  nodePerLayer: number;
  layerCount: number;
  learningRate: number;
  learningLimit: number;
};

const nodeCountOptions = [1, 2, 3, 4, 5];
const layerCountOptions = [1, 2, 3, 4, 5];

class ControlPanel extends React.Component<Props, State> {
  state = {
    nodePerLayer: parseInt(this.props.nodePerLayer),
    layerCount: parseInt(this.props.layerCount),
    learningRate: parseFloat(this.props.learningRate),
    learningLimit: parseFloat(this.props.learningLimit),
  };

  onChangeNodePerLayer (event: FormEvent<FormControlProps>) {
    const value: number = parseInt((event.currentTarget as any).value);
    this.setState({ ...this.state, nodePerLayer: value });
  }

  onChangeLayerCount (event: FormEvent<FormControlProps>) {
    const value: number = parseInt((event.currentTarget as any).value);
    this.setState({ ...this.state, layerCount: value });
  }

  onChangeLearningRate (event: FormEvent<FormControlProps>) {
    const value: number = parseFloat((event.currentTarget as any).value);
    this.setState({ ...this.state, learningRate: value });
  }

  onChangeLearningLimit (event: FormEvent<FormControlProps>) {
    const value: number = parseFloat((event.currentTarget as any).value);
    this.setState({ ...this.state, learningLimit: value });
  }

  onClickActivate () {
    const { nodePerLayer, layerCount, learningRate, learningLimit } = this.state;
    this.props.setNodePerLayer(nodePerLayer);
    this.props.setLayerCount(layerCount);
    this.props.setLearningRate(learningRate);
    this.props.setLearningLimit(learningLimit);

    const targets = getTargets(nodePerLayer);
    bootstrapper({ targets, layerCount, nodePerLayer, learningRate, learningLimit });
  }

  render () {
    return (
      <Form className="control-panel">
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Node per Layer</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.props.nodePerLayer}
              onChange={this.onChangeNodePerLayer.bind(this)}>
              {nodeCountOptions.map(num => <option value={num} key={num}>{num}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Layer Count</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.props.layerCount}
              onChange={this.onChangeLayerCount.bind(this)}>
              {layerCountOptions.map(num => <option value={num} key={num}>{num}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Learning Rate</Form.Label>
            <Form.Control
              type="number"
              defaultValue={this.props.learningRate}
              onChange={this.onChangeLearningRate.bind(this)} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Learning Limit</Form.Label>
            <Form.Control
              type="number"
              defaultValue={this.props.learningLimit}
              onChange={this.onChangeLearningLimit.bind(this)} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button
              id="active-button"
              variant="outline-light"
              onClick={this.onClickActivate.bind(this)}>Activate</Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);