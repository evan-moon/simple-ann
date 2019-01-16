import { sigmoid, multiplation } from 'lib/math';

/**
 * @class Neuron
 * @member id
 * @member inputs
 * @member weights
 * @member variableLength
 * @member notActivateResult input, weight의 계산 결과 값
 * @member activateResult notActivateResult가 Activation Function을 통과한 값
 * @member deffActivateResult Activation Function / 계산 결과 값에 대한 미분 값
 * @member deffWeights 계산 결과 / weights에 대한 미분 값 -> wx/w 이므로 해는 x가 된다.
 * @member deffErrors 각 에러 / activateResult에 대한 미분 값. FrontPropagation 계산 당시에는 모른다
 */
export class Neuron {
  public id: string;
  private inputs: number[];
  private weights: number[];
  private variableLength: number;
  private notActivatedResult: number;
  private activatedResult: number;
  private activatedResultPrime: number;
  private loss: number;

  constructor (id: string = 'anonymous-neuron', weights: number[]) {
    this.id = id;
    this.weights = [...weights];
    this.variableLength = weights.length;
    this.notActivatedResult = 0;
    this.activatedResult = 0;
    this.activatedResultPrime = 0;
    this.loss = 0;
  }

  public setInputs (inputs: number[]) {
    if (inputs.length !== this.variableLength) {
      throw new Error(`Error in ${this.id} :: ${inputs.length} is must be ${this.variableLength}`);
    }
    this.inputs = [...inputs];
  }

  public calc () {
    this.notActivatedResult = multiplation(this.inputs, this.weights);
    this.activatedResult = sigmoid(this.notActivatedResult);
    this.activatedResultPrime = sigmoid(this.notActivatedResult, true);
  }

  public getCalcedResult () {
    return this.activatedResult;
  }

  public getLoss () {
    return this.loss;
  }

  updateWeights (lossPrime, learningRate) {
    this.weights = this.weights.map((weight, index) => {
      this.loss = lossPrime * this.activatedResultPrime * this.inputs[index];
      return weight - (learningRate * this.loss);
    });
  }
}
