import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
  generate(entity: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}