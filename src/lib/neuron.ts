import { sigmoid, multiplation } from 'lib/math';

export class Neuron {
  private id: string;
  private inputs: number[];
  private weights: number[];
  private variableLength: number;

  /**
   * @private notActivatedResult
   * @type { number }
   * @desc Activation Function을 거치지 않은 계산값
   */
  private notActivatedResult: number = 0;
  /**
   * @private activatedResult
   * @type { number }
   * @desc Activation Function을 거친 후의 계산값
   */
  private activatedResult: number = 0;
  /**
   * @private diffedActivation
   * @type { number }
   * @desc Activation Function의 미분값
   */
  private diffedActivation: number = 0;

  private parents: Neuron[];
  private children: Neuron[];

  constructor (id: string = 'anonymous-neuron', weights: number[]) {
    this.id = id;
    this.weights = [...weights];
    this.variableLength = weights.length;
  }

  public setInputs (inputs: number[]) {
    if (inputs.length !== this.variableLength) {
      throw new Error(`Error in ${this.id} :: ${inputs.length} is must be ${this.variableLength}`);
    }
    this.inputs = [...inputs];
  }

  public setParents (neurons: Neuron[]) {
    this.parents = neurons;
  }

  public setChildren (neurons: Neuron[]) {
    this.children = neurons;
  }

  public calc () {
    this.notActivatedResult = multiplation(this.inputs, this.weights);
    this.activatedResult = sigmoid(this.notActivatedResult);
    this.diffedActivation = this.activatedResult / this.notActivatedResult;
  }

  public getCalcedResult () {
    return this.activatedResult;
  }
}
