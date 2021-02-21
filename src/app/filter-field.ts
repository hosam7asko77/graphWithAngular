export class FilterField {
  private _operator: string;
	private _value: string;

  constructor(operator: string, value: string) {
    this._operator = operator;
    this._value = value;
  }

  get operator(): string {
    return this._operator;
  }

  set operator(value: string) {
    this._operator = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }
}
