import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoice-item";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: InvoiceItems[]

  constructor(props: InvoiceProps) {
    super(props.id)
    this._name = props.name
    this._address = props.address
    this._document = props.document
    this._items = props.items
  }
  
  public get name() : string {
    return this._name
  }
  
  public get address() : Address {
    return this._address
  }

  public get document() : string {
    return this._document
  }
  
  public get items() : InvoiceItems[] {
    return this._items
  }
}