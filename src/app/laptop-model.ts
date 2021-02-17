export class LaptopModel {
  private _id: number;
  private _name: string;
  private _company: string;
  private _price: number;
  private _ram: number;

  constructor(id: number, name: string, company: string, price: number, ram: number) {
    this._id = id;
    this._name = name;
    this._company = company;
    this._price = price;
    this._ram = ram;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get ram(): number {
    return this._ram;
  }

  set ram(value: number) {
    this._ram = value;
  }
}
