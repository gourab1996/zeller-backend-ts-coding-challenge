import { Product } from '../models/product';

export interface IPricingRule {
  apply(items: Product[]): number;
}
