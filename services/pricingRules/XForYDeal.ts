// rules/XForYDeal.ts

import { IPricingRule } from '../../interface/pricingRules';
import { Product } from '../../models/product';

export class XForYDeal implements IPricingRule {
  constructor(private sku: string, private threshold: number, private payFor: number) {}

  apply(items: Product[]): number {
    const applicableItems = items.filter(item => item.sku === this.sku);
    const eligibleGroups = Math.floor(applicableItems.length / this.threshold);
    const discountPerGroup = (this.threshold - this.payFor) * (applicableItems[0]?.price || 0);
    return eligibleGroups * discountPerGroup;
  }
}
