import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
  private _name: string
  private _price: number

  constructor(name: string, price: number, id?: string) {
    super(new Id(id))
    this._name = name
    this._price = price
  }
  
  public get name() : string {
    return this._name
  }
  
  public get price() : number {
    return this._price
  }
}