export interface Currency {
  id: number
  name: string
  short_code: string
  code: string
  precision: number
  subunit: number
  symbol: string
  symbol_first: boolean
  decimal_mark: string
  thousands_separator: string
}


// "id": 4,
// "name": "Armenian Dram",
// "short_code": "AMD",
// "code": "51",
// "precision": 2,
// "subunit": 100,
// "symbol": "դր.",
// "symbol_first": false,
// "decimal_mark": ".",
// "thousands_separator": ","