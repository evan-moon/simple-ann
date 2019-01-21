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
  private weightPrimes: number[];

  constructor (id: string = 'anonymous-neuron', weights: number[]) {
    this.id = id;
    this.weights = [...weights];
    this.variableLength = weights.length;
    this.notActivatedResult = 0;
    this.activatedResult = 0;
    this.activatedResultPrime = 0;
    this.weightPrimes = [];
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

  public getWeightPrimes () {
    return this.weightPrimes;
  }

  updateWeights (lossPrime: number, learningRate: number) {
    this.weights = this.weights.map((weight, index) => {
      const p = lossPrime * this.activatedResultPrime;
      const loss = p * this.inputs[index];
      this.weightPrimes[index] = p * weight;
      return weight - (learningRate * loss);
    });
  }
}
