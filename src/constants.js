export const store = {
  isPageLast: null,
  data: null,
  page: 0,
  pagination: 10,
  theadNames: [],
  prices: {},
  metrices: {},
}

export const THEAD_DATA = {
  companyName: 'Компания',
  amountAbbr: '(шт.)',
  priceAbbr: '(руб.)',
  total() {
      return `Итого ${this.priceAbbr}`;
  }
};

export const TBODY_DATA = {
  roundDigits: 2,
  noDataString: '--',
};

export const TFOOT_DATA = {
  metrices: {
    average: 'Среднее',
    max: 'Максимум',
    total: 'Итого',
  },
};
