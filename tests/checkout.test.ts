// checkout.test.ts
import { Checkout } from '../services/checkout/checkout';
import { Product } from '../models/product'
import { BulkDeal } from '../services/pricingRules/BulkDeal';
import { XForYDeal } from '../services/pricingRules/XForYDeal';
import { IPricingRule } from '../interface/pricingRules'

describe('Checkout System', () => {
  test('SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd - Total expected: $2718.95', () => {

    const atv: Product = { sku: 'atv', name: 'Apple TV', price: 109.50 };
    const ipd: Product = { sku: 'ipd', name: 'Super iPad', price: 549.99 };

    const pricingRules: IPricingRule[] = [
      new XForYDeal('atv', 3, 2),
      new BulkDeal('ipd', 4, 499.99),
    ];

    const co = new Checkout(pricingRules);

    const skusScanned = ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd'];
    skusScanned.forEach(sku => {
      if (sku === 'atv') co.scan(atv);
      if (sku === 'ipd') co.scan(ipd);
    });

    const expectedTotal = 2718.95;
    expect(co.total()).toEqual(expectedTotal);
  });

  test('SKUs Scanned: atv, atv, atv, vga Total expected: $249.00', () => {
    const atv: Product = { sku: 'atv', name: 'Apple TV', price: 109.50 };
    const vga: Product = { sku: 'vga', name: 'VGA adapter', price: 30.00 };

    const pricingRules: IPricingRule[] = [
      new XForYDeal('atv', 3, 2)
    ];

    const co = new Checkout(pricingRules);

    const skusScanned = ['atv', 'atv', 'atv', 'vga'];
    skusScanned.forEach(sku => {
      if (sku === 'atv') co.scan(atv);
      if (sku === 'vga') co.scan(vga);
    });

    const expectedTotal = 249.00;
    expect(co.total()).toEqual(expectedTotal);
  });

  test('SKUs Scanned: 6x atv, 1vga Total expected: $468.00', () => {
    const atv: Product = { sku: 'atv', name: 'Apple TV', price: 109.50 };
    const vga: Product = { sku: 'vga', name: 'VGA adapter', price: 30.00 };

    const pricingRules: IPricingRule[] = [
      new XForYDeal('atv', 3, 2),
    ];

    const co = new Checkout(pricingRules);

    const skusScanned = ['atv', 'atv', 'atv', 'atv', 'atv', 'atv', 'vga'];
    skusScanned.forEach(sku => {
      if (sku === 'atv') co.scan(atv);
      if (sku === 'vga') co.scan(vga);
    });

    const expectedTotal = 468.00;
    expect(co.total()).toEqual(expectedTotal);
  });

  test('SKUs Scanned: 6x atv, 5vga Total expected: $528.00', () => {
    const atv: Product = { sku: 'atv', name: 'Apple TV', price: 109.50 };
    const vga: Product = { sku: 'vga', name: 'VGA adapter', price: 30.00 };

    const pricingRules: IPricingRule[] = [
      new XForYDeal('atv', 3, 2),
      new XForYDeal('vga', 3, 1),
    ];

    const co = new Checkout(pricingRules);

    const skusScanned = ['atv', 'atv', 'atv', 'atv', 'atv', 'atv', 'vga', 'vga', 'vga', 'vga', 'vga'];
    skusScanned.forEach(sku => {
      if (sku === 'atv') co.scan(atv);
      if (sku === 'vga') co.scan(vga);
    });

    const expectedTotal = 528.00;
    expect(co.total()).toEqual(expectedTotal);
  });

  test('SKUs Scanned: 6x atv, 5vga, 4ipd Total expected: $2527.96', () => {
    const atv: Product = { sku: 'atv', name: 'Apple TV', price: 109.50 };
    const vga: Product = { sku: 'vga', name: 'VGA adapter', price: 30.00 };
    const ipd: Product = { sku: 'ipd', name: 'Super iPad', price: 549.99 };

    const pricingRules: IPricingRule[] = [
      new XForYDeal('atv', 3, 2),
      new BulkDeal('ipd', 2, 499.99),
      new XForYDeal('vga', 3, 1),
    ];

    const co = new Checkout(pricingRules);

    const skusScanned = ['atv', 'atv', 'atv', 'atv', 'atv', 'atv', 'vga', 'vga', 'vga', 'vga', 'vga', 'ipd', 'ipd', 'ipd', 'ipd'];
    skusScanned.forEach(sku => {
      if (sku === 'atv') co.scan(atv);
      if (sku === 'vga') co.scan(vga);
      if (sku === 'ipd') co.scan(ipd);
    });

    const expectedTotal = 2527.96;
    expect(co.total()).toEqual(expectedTotal);
  });
});
