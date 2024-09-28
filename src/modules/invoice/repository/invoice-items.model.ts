import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice-items",
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({allowNull: false})
  invoice_id: string;

  @BelongsTo(() => InvoiceModel)
  declare invoice: InvoiceModel;
  
  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  price: number;
}