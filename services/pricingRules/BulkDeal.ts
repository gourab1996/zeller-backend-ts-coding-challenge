import { IPricingRule } from '../../interface/pricingRules';
import { Product } from '../../models/product';

export class BulkDeal implements IPricingRule {
  constructor(private sku: string, private threshold: number, private pricePerItem: number) {}

  apply(items: Product[]): number {
    let totalDiscount = 0;
    const applicableItems = items.filter(item => item.sku === this.sku);
    if (applicableItems.length > this.threshold) {
        applicableItems.forEach(item => {
            totalDiscount += item?.price - this.pricePerItem;
        });
    }
    return totalDiscount;
  }
}
