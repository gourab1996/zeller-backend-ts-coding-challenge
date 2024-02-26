import { Product } from './models/product';
import { IPricingRule } from './interface/pricingRules';
import { XForYDeal } from './services/pricingRules/XForYDeal';
import { Checkout } from './services/checkout/checkout';
import { BulkDeal } from './services/pricingRules/BulkDeal';

function parseCommandLineArgs() {
  const productsArg = process.argv[2];
  const rulesArg = process.argv[3];
  const products: Product[] = JSON.parse(productsArg).products;
  const rulesConfig = JSON.parse(rulesArg).rules;
  console.log('rules:', rulesConfig);
  console.log('products:', products);
  const pricingRules: IPricingRule[] = rulesConfig.map((rule: any) => {
    switch (rule.type) {
      case "XForYDeal":
        return new XForYDeal(rule.sku, rule.threshold, rule.payFor);
      case "BulkDeal":
        return new BulkDeal(rule.sku, rule.threshold, rule.pricePerItem);
      // Add cases here for other types of rules as you implement them
      default:
        throw new Error(`Rule type ${rule.type} is not implemented`);
    }
  });

  return { products, pricingRules };
}

const { products, pricingRules } = parseCommandLineArgs();

const co = new Checkout(pricingRules);

products.forEach(product => co.scan(product));

console.log(`Total expected: $${co.total().toFixed(2)}`);
