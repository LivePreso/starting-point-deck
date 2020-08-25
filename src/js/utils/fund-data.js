const PRODUCT_TYPE_DISPLAY_MAP = {
  etf: 'ETFs',
  managed_fund: 'Managed funds',
  managed_account: 'Managed account'
};

const OUR_PRODUCTS_FUNDS = [
  {
    fund: 'Vanguard Australian Property Securities Index Fund',
    asset_classes: ['property'],
    product_type: { etf: 0.23, managed_fund: 0.23 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8206/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8105/equity'
    }
  },
  {
    fund: 'Vanguard International Property Securities Index Fund',
    asset_classes: ['property'],
    product_type: { managed_fund: 0.4 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8115/equity'
    }
  },
  {
    fund: 'Vanguard International Property Securities Index Fund (Hedged)',
    asset_classes: ['property'],
    product_type: { managed_fund: 0.43 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8114/equity'
    }
  },
  {
    fund: 'Vanguard Australian Shares Index Fund',
    asset_classes: ['australian_shares'],
    product_type: { etf: 0.1, managed_fund: 0.16 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8205/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8100/equity'
    }
  },
  {
    fund: 'Vanguard Australian Shares High Yield Fund',
    asset_classes: ['australian_shares'],
    product_type: { etf: 0.25, managed_fund: 0.35 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8210/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8106/equity'
    }
  },
  {
    fund: 'Vanguard MSCI Australian Large Companies Index ETF',
    asset_classes: ['australian_shares'],
    product_type: { etf: 0.2 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8106/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard MSCI Australian Small Companies Index ETF',
    asset_classes: ['australian_shares'],
    product_type: { etf: 0.3 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8211/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard International Shares Index Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.18, managed_fund: 0.18 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8212/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8116/equity'
    }
  },
  {
    fund: 'Vanguard International Shares Index Fund (Hedged)',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.21, managed_fund: 0.21 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8213/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8101/equity'
    }
  },
  {
    fund: 'Vanguard Ethically Conscious International Shares Index Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.18, managed_fund: 0.2 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8225/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8159/equity'
    }
  },
  {
    fund:
      'Vanguard Ethically Conscious International Shares Index Fund (hedged to NZD)',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.26 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8161/equity'
    }
  },
  {
    fund: 'Vanguard International Shares Select Exclusions Index Fund ',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.2 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8122/equity'
    }
  },
  {
    fund:
      'Vanguard International Shares Select Exclusions Index Fund (hedged to AUD)',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.23 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8124/equity'
    }
  },
  {
    fund:
      'Vanguard International Shares Select Exclusions Index Fund (hedged to NZD)',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.26 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8125/equity'
    }
  },
  {
    fund: 'Vanguard Emerging Markets Shares Index Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.48, managed_fund: 0.56 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8204/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8109/equity'
    }
  },
  {
    fund: 'Vanguard International Small Companies Index Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.32, managed_fund: 0.39 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8227/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8118/equity'
    }
  },
  {
    fund: 'Vanguard International Small Companies Index Fund (Hedged)',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.42 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8117/equity'
    }
  },
  {
    fund: 'Vanguard All-World ex-US Shares Index ETF',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.08 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/0991/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard US Total Market Shares Index ETF',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.03 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/0970/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard FTSE Europe Shares ETF',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.35 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8214/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard FTSE Asia ex Japan Shares Index ETF',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.4 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8215/equity',
      managed_fund: null
    }
  },
  {
    fund: 'Vanguard Active Global Growth Fund',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.6 },
    fund_style: 'active',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8140/equity'
    }
  },
  {
    fund: 'Vanguard Active Emerging Market Equity Fund',
    asset_classes: ['international_shares'],
    product_type: { managed_fund: 0.88 },
    fund_style: 'active',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8142/equity'
    }
  },
  {
    fund: 'Vanguard Global Multi-Factor Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.33, managed_fund: 0.35 },
    fund_style: 'active',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8229/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8131/equity'
    }
  },
  {
    fund: 'Vanguard Global Minimum Volatility Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.28, managed_fund: 0.35 },
    fund_style: 'active',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8201/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8154/equity'
    }
  },
  {
    fund: 'Vanguard Global Value Equity Fund',
    asset_classes: ['international_shares'],
    product_type: { etf: 0.28, managed_fund: 0.35 },
    fund_style: 'active',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8202/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8157/equity'
    }
  },
  {
    fund: 'Vanguard Global Infrastructure Index Fund',
    asset_classes: ['infrastructure'],
    product_type: { etf: 0.47, managed_fund: 0.49 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8228/equity',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8110/equity'
    }
  },
  {
    fund: 'Vanguard Global Infrastructure Index Fund (Hedged)',
    asset_classes: ['infrastructure'],
    product_type: { managed_fund: 0.52 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8111/equity'
    }
  },
  {
    fund: 'Vanguard Australian Fixed Interest Index Fund',
    asset_classes: ['australian_fixed_interest'],
    product_type: { etf: 0.2, managed_fund: 0.24 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8207/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8103/bond'
    }
  },
  {
    fund: 'Vanguard Australian Government Bond Index Fund',
    asset_classes: ['australian_fixed_interest'],
    product_type: { etf: 0.2, managed_fund: 0.24 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8208/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8104/bond'
    }
  },
  {
    fund: 'Vanguard Australian Inflation-Linked Bond Index Fund',
    asset_classes: ['australian_fixed_interest'],
    product_type: { managed_fund: 0.29 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8137/bond'
    }
  },
  {
    fund: 'Vanguard Australian Corporate Fixed Interest Index Fund',
    asset_classes: ['australian_fixed_interest'],
    product_type: { etf: 0.26, managed_fund: 0.29 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8203/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8139/bond'
    }
  },
  {
    fund: 'Vanguard Global Aggregate Bond Index Fund (Hedged)',
    asset_classes: ['international_fixed_interest'],
    product_type: { etf: 0.2, managed_fund: 0.24 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8200/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8130/bond'
    }
  },
  {
    fund: 'Vanguard International Fixed Interest Index Fund (Hedged)',
    asset_classes: ['international_fixed_interest'],
    product_type: { etf: 0.2, managed_fund: 0.26 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8216/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8113/bond'
    }
  },
  {
    fund: 'Vanguard International Credit Securities Index Fund (Hedged)',
    asset_classes: ['international_fixed_interest'],
    product_type: { etf: 0.3, managed_fund: 0.32 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8217/bond',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8112/bond'
    }
  },
  {
    fund: 'Vanguard Active Global Credit Bond Fund',
    asset_classes: ['international_fixed_interest'],
    product_type: { managed_fund: 0.4 },
    fund_style: 'active',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8162/bond',
      managed_fund: null
    }
  },
  {
    fund:
      'Vanguard Ethically Conscious Global Aggregate Bond Index (Hedged) ETF',
    asset_classes: ['international_fixed_interest'],
    product_type: { etf: 0.26 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8224/bond',
      managed_fund: null
    }
  },
  {
    fund:
      'Vanguard Ethically Conscious Global Aggregate Bond Index Fund (hedged to AUD)',
    asset_classes: ['international_fixed_interest'],
    product_type: { managed_fund: 0.28 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8136/bond'
    }
  },
  {
    fund:
      'Vanguard Ethically Conscious Global Aggregate Bond Index Fund (hedged to NZD)',
    asset_classes: ['international_fixed_interest'],
    product_type: { managed_fund: 0.28 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8135/bond'
    }
  },
  {
    fund: 'Vanguard Diversified Bond Index Fund',
    asset_classes: ['international_fixed_interest, australian_fixed_interest'],
    product_type: { managed_fund: 0.29 },
    fund_style: 'index',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8138/bond'
    }
  },
  {
    fund: 'Vanguard Diversified Conservative Index Fund',
    asset_classes: ['multi_asset'],
    product_type: { etf: 0.27, managed_fund: 0.29, managed_account: 0.32 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8219/balanced',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8132/balanced'
    }
  },
  {
    fund: 'Vanguard Diversified Balanced Index Fund',
    asset_classes: ['multi_asset'],
    product_type: { etf: 0.27, managed_fund: 0.29, managed_account: 0.32 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8218/balanced',
      managed_fund:
        'vanguard.com.au/adviser/products/en/detail/wholesale/8121/balanced'
    }
  },
  {
    fund: 'Vanguard Diversified Growth Index Fund',
    asset_classes: ['multi_asset'],
    product_type: { etf: 0.27, managed_fund: 0.29, managed_account: 0.32 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8220/balanced',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8133/balanced'
    }
  },
  {
    fund: 'Vanguard Diversified High Growth Index Fund',
    asset_classes: ['multi_asset'],
    product_type: { etf: 0.27, managed_fund: 0.29, managed_account: 0.32 },
    fund_style: 'index',
    links: {
      etf:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8221/balanced',
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/etf/8221/balanced'
    }
  },
  {
    fund: 'Vanguard Managed Payout Fund',
    asset_classes: ['multi_asset'],
    product_type: { managed_fund: 0.55 },
    fund_style: 'active',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8155/balanced'
    }
  },
  {
    fund: 'Vanguard Cash Reserve Fund',
    asset_classes: ['cash'],
    product_type: { managed_fund: 0.15 },
    fund_style: 'active',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8108/moneymkt'
    }
  },
  {
    fund: 'Vanguard Cash Plus Fund',
    asset_classes: ['cash'],
    product_type: { managed_fund: 0.29 },
    fund_style: 'active',
    links: {
      etf: null,
      managed_fund:
        'https://www.vanguard.com.au/adviser/products/en/detail/wholesale/8107/moneymkt'
    }
  }
];
