export interface TableSettings {
  attributes: Record<string, boolean>;
  expandables: string[];
  interactables: string[];
  currencies: string[];
  hasDetails: string[];
  filterables: string[];
  omitOnMenu: string[];
}

const settings: TableSettings = {
  attributes: {
    customer: true,
    company: true,
    contact: true,
    address: true,
    revenue: true,
    VAT: true,
    totalPrice: true,
    status: true
  },
  expandables: ['company', 'contact', 'address'],
  interactables: ['revenue', 'VAT', 'totalPrice'],
  currencies: ['revenue', 'VAT', 'totalPrice'],
  hasDetails: ['address'],
  filterables: ['VAT'],
  omitOnMenu: ['customer']
}

export default settings;
