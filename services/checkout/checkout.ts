import { Product } from '../../models/product';
import { IPricingRule } from '../../interface/pricingRules';

export class Checkout {
  private items: Product[] = [];
  private pricingRules: IPricingRule[] = [];

  constructor(pricingRules: IPricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: Product): void {
    this.items.push(item);
  }

  total(): number {
    let total = this.items.reduce((sum, item) => sum + item.price, 0);

    this.pricingRules.forEach(rule => {
      total -= rule.apply(this.items);
    });

    return total;
  }
}
