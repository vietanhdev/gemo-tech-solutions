import {describe} from 'mocha';
import assert from 'assert/strict';
import { calculatePrice1, calculatePrice2, calculatePrice3, calculatePrice4, calculatePrice5, handleBreakFast } from './calculator.js';
import { DRINK_TYPE_TO_BASE_PRICE, SIZE_TO_ADDITIONAL_PRICE } from './constants.js';

describe('calculatePrice1', function() {
  it('should return the correct price for a small hot drink without whipped cream', function() {
    assert.equal(calculatePrice1('hot', 'S', false), 2);
  });

  it('should return the correct price for a medium cold drink without whipped cream', function() {
    assert.equal(calculatePrice1('cold', 'M', false), 2.5);
  });

  it('should return the correct price for a large blended drink with whipped cream', function() {
    assert.equal(calculatePrice1('blended', 'L', true), 4.5);
  });

  it('should throw an error for an invalid drink type', function() {
    assert.throws(() => calculatePrice1('invalid', 'M', false), Error, 'Invalid drink type. Please choose from hot, cold, blended.');
  });

  it('should throw an error for an invalid size', function() {
    assert.throws(() => calculatePrice1('hot', 'invalid', false), Error, 'Invalid size. Please choose from S, M, or L.');
  });

  it('should throw an error for an invalid whipped cream value', function() {
    assert.throws(() => calculatePrice1('cold', 'S', 'invalid'), Error, 'Invalid whipped cream value. Please choose true or false.');
  });

  it('should throw an error when trying to order an L size hot drink', function() {
    assert.throws(() => calculatePrice1('hot', 'L', false), Error, 'L size is only available for cold and blended drinks.');
  });
});



describe('calculatePrice2', () => {
  it('should calculate the correct price for a small hot drink without whipped cream or milk', () => {
    const drinkType = 'hot';
    const size = 'S';
    const whippedCream = false;
    const almond = false;

    const expectedPrice = DRINK_TYPE_TO_BASE_PRICE[drinkType] + SIZE_TO_ADDITIONAL_PRICE[size];
    const actualPrice = calculatePrice2(drinkType, size, whippedCream, almond);

    assert.strictEqual(actualPrice, expectedPrice);
  });

  it('should throw an error for an invalid drink type', () => {
    const drinkType = 'invalid';
    const size = 'M';
    const whippedCream = false;
    const almond = false;

    assert.throws(() => calculatePrice2(drinkType, size, whippedCream, almond), Error);
  });

  it('should throw an error for an invalid size', () => {
    const drinkType = 'cold';
    const size = 'invalid';
    const whippedCream = false;
    const almond = false;

    assert.throws(() => calculatePrice2(drinkType, size, whippedCream, almond), Error);
  });

  it('should throw an error for an invalid whipped cream value', () => {
    const drinkType = 'cold';
    const size = 'M';
    const whippedCream = 'invalid';
    const almond = false;

    assert.throws(() => calculatePrice2(drinkType, size, whippedCream, almond), Error);
  });

  it('should throw an error for an invalid milk value', () => {
    const drinkType = 'cold';
    const size = 'M';
    const whippedCream = false;
    const almond = 'invalid';

    assert.throws(() => calculatePrice2(drinkType, size, whippedCream, almond), Error);
  });


  it('should calculate the correct price for a blended drink with whipped cream and almond milk', () => {
    const drinkType = 'blended';
    const size = 'L';
    const whippedCream = true;
    const almond = true;

    const expectedPrice = DRINK_TYPE_TO_BASE_PRICE[drinkType] + SIZE_TO_ADDITIONAL_PRICE[size] + 0.5 + 0.5;
    const actualPrice = calculatePrice2(drinkType, size, whippedCream, almond);

    assert.strictEqual(actualPrice, expectedPrice);
  });
});


describe('calculatePrice3', () => {
  it('should return the correct price for a hot drink with no chocolate sauce and no whipped cream', () => {
    const price = calculatePrice3('hot', 'S', false, false);
    assert.strictEqual(price, 2.0);
  });

  it('should throw an error if an invalid drink type is provided', () => {
    assert.throws(() => {
      calculatePrice3('iced', 'M', true, false);
    }, /Invalid drink type/);
  });

  it('should throw an error if an invalid size is provided', () => {
    assert.throws(() => {
      calculatePrice3('hot', 'XLL', false, false);
    }, /Invalid size/);
  });

  it('should throw an error if an invalid whipped cream value is provided', () => {
    assert.throws(() => {
      calculatePrice3('cold', 'L', 'yes', false);
    }, /Invalid whipped cream value/);
  });

  it('should return the correct price for a hot drink with 3 pumps of chocolate sauce and whipped cream', () => {
    const price = calculatePrice3('hot', 'L', true, false, 3);
    assert.strictEqual(price, 4);
  });

  it('should throw an error if an invalid chocolate sauce value is provided', () => {
    assert.throws(() => {
      calculatePrice3('hot', 'M', false, false, 7);
    }, /Invalid chocolate sauce pumps/);
  });
});


describe('handleBreakFast', function() {
  it('should return base price of 3 for a sandwich without a topping', function() {
    assert.equal(handleBreakFast('sandwich'), 3);
  });

  it('should return base price of 4 for a sandwich with egg topping', function() {
    assert.equal(handleBreakFast('sandwich', 'egg'), 4);
  });

  it('should return base price of 4 for a sandwich with turkey topping', function() {
    assert.equal(handleBreakFast('sandwich', 'turkey'), 4);
  });

  it('should throw an error if an invalid sandwich topping is provided', function() {
    assert.throws(() => handleBreakFast('sandwich', 'ham'), Error);
  });

  it('should return base price of 3 for a bagel without a topping', function() {
    assert.equal(handleBreakFast('bagel'), 3);
  });

  it('should return base price of 3.5 for a bagel with butter topping', function() {
    assert.equal(handleBreakFast('bagel', 'butter'), 3.5);
  });

  it('should return base price of 3.5 for a bagel with cream cheese topping', function() {
    assert.equal(handleBreakFast('bagel', 'cream_cheese'), 3.5);
  });

  it('should throw an error if an invalid bagel topping is provided', function() {
    assert.throws(() => handleBreakFast('bagel', 'jam'), Error);
  });

  it('should throw an error if an invalid item type is provided', function() {
    assert.throws(() => handleBreakFast('cookie'), Error);
  });
});


describe('calculatePrice4', function() {
  it('should return correct price for a blended drink with whipped cream and almond milk + a sandwich without a topping', function() {
    const drinkType = 'blended';
    const size = 'L';
    const whippedCream = true;
    const almond = true;

    const expectedPrice = DRINK_TYPE_TO_BASE_PRICE[drinkType] + SIZE_TO_ADDITIONAL_PRICE[size] + 0.5 + 0.5 + 3;
    const actualPrice = calculatePrice4(drinkType, size, whippedCream, almond, 2, 'sandwich');

    assert.strictEqual(actualPrice, expectedPrice);
  });
});


describe('calculatePrice5', function () {

  it('should calculate total price and price breakdown for a single item', function () {
    const items = [
      { drinkType: 'hot', size: 'S', whippedCream: true, almond: false, chocolateSauce: 1 }
    ];
    const expected = {
      totalPrice: 2.68125,
      priceBreakdown: [
        { item: items[0], price: 2.5 }
      ]
    };
    const result = calculatePrice5(items);
    assert.deepStrictEqual(result, expected);
  });

  it('should calculate total price and price breakdown for multiple items', function () {
    const items = [
      { drinkType: 'cold', size: 'M', whippedCream: false, almond: false, chocolateSauce: 2 },
      { drinkType: 'blended', size: 'XL', whippedCream: true, almond: true, chocolateSauce: 4 },
      { drinkType: 'cold', size: 'M', whippedCream: false, almond: true, breakFastItemType: 'sandwich', breakfastTopping: 'egg' }
    ];
    const expected = {
      totalPrice: 17.16,
      priceBreakdown: [
        { item: items[0], price: 2.5 },
        { item: items[1], price: 6.5 },
        { item: items[2], price: 7 }
      ]
    };
    const result = calculatePrice5(items);
    assert.deepStrictEqual(result, expected);
  });

  it('should handle an empty item list', function () {
    const items = [];
    const expected = {
      totalPrice: 0,
      priceBreakdown: []
    };
    const result = calculatePrice5(items);
    assert.deepStrictEqual(result, expected);
  });

});