import { SIZE_TO_ADDITIONAL_PRICE, DRINK_TYPE_TO_BASE_PRICE, WHIPPED_CREAM_PRICE, CHOCOLATE_SAUCE_PUMPS_TO_ADDITIONAL_PRICE, BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE, TAX, ALMOND_MILK_PRICE } from "./constants.js";

// Implement function calculatePrice1 to calculate the price of a coffee order based on the following parameters:
//   1. Drink type: hot, cold, or blended
//   2. Size: S, M, or L
//   3. Whipped cream topping: with or without
//   4. Availability of L size: only for cold and blended drinks
//   5. Base price: $2 for a small hot drink without cream
//   6. Price adjustments:
//     * $.5 for M size, $1 for L size
//     * $1 for blended drinks
//     * $.5 for whipped cream topping
export function calculatePrice1(drinkType, size, whippedCream = false) {
    if (!['hot', 'cold', 'blended'].includes(drinkType)) {
        throw new Error('Invalid drink type. Please choose from hot, cold, or blended.');
    }
    if (!['S', 'M', 'L'].includes(size)) {
        throw new Error('Invalid size. Please choose from S, M, or L.');
    }
    if (typeof whippedCream !== 'boolean') {
        throw new Error('Invalid whipped cream value. Please choose true or false.');
    }
    if (size === 'L' && !['cold', 'blended'].includes(drinkType)) {
        throw new Error('L size is only available for cold and blended drinks.');
    }

    var price = DRINK_TYPE_TO_BASE_PRICE[drinkType];
    price += SIZE_TO_ADDITIONAL_PRICE[size];
    price += whippedCream ? WHIPPED_CREAM_PRICE : 0;
    return price;
}

// Implement function calculatePrice2 that
//   1. add XL size which will cost $1.5 additionally
//   2. Add milk tea drink type with a base price of $2.25
//   3. Add milk options where whole milk or almond milk with almond cost additional 50c
//   NOTE: The requirement of size constraint for Cafe is removed as it does not make sense =))
export function calculatePrice2(drinkType, size, whippedCream = false, almond = false) {
    if (!Object.keys(DRINK_TYPE_TO_BASE_PRICE).includes(drinkType)) {
        throw new Error('Invalid drink type. Please choose from: ' + Object.keys(DRINK_TYPE_TO_BASE_PRICE).join(', ') + '.');
    }
    if (!Object.keys(SIZE_TO_ADDITIONAL_PRICE).includes(size)) {
        throw new Error('Invalid size. Please choose from: ' + Object.keys(SIZE_TO_ADDITIONAL_PRICE).join(', ') + '.');
    }
    if (typeof whippedCream !== 'boolean') {
        throw new Error('Invalid whipped cream value. Please choose true or false.');
    }
    if (typeof almond !== 'boolean') {
        throw new Error('Invalid almond value. Please choose true or false.');
    }

    var price = DRINK_TYPE_TO_BASE_PRICE[drinkType];
    price += SIZE_TO_ADDITIONAL_PRICE[size];
    price += whippedCream ? WHIPPED_CREAM_PRICE : 0;
    price += almond ? ALMOND_MILK_PRICE : 0;
    return price;
}

// Add function calculatePrice3 which allow customization options for chocolate sauce, which can only be added to hot drinks and has the following pricing:
//   1. The first 2 pumps are free
//   2. $0.5 for each extra pump
//   3. Maximum of 6 pumps
export function calculatePrice3(drinkType, size, whippedCream = false, almond = false, chocolateSauce = 0) {
    let price = calculatePrice2(drinkType, size, whippedCream, almond);
    if (!Number.isInteger(chocolateSauce) || chocolateSauce < 0 || chocolateSauce > CHOCOLATE_SAUCE_PUMPS_TO_ADDITIONAL_PRICE.length - 1) {
        throw new Error('Invalid chocolate sauce pumps.');
    }
    price += CHOCOLATE_SAUCE_PUMPS_TO_ADDITIONAL_PRICE[chocolateSauce];
    return price;
}


// Add function calculatePrice4 that can handle the customization options for breakfast items, which includes sandwiches and bagels with the following specifications:
//   1. Both has base price of $3
//   2. Sandwiches can be egg or turkey for $1 additionally
//   3. Bagels can have butter or cream cheese toppings for 50c additionally
//   4. There is no size for food items
export function handleBreakFast(itemType, topping = null) {
    // Check itemType is the key of BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE
    if (!Object.keys(BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE).includes(itemType)) {
        throw new Error('Invalid item type. Please choose from: ' + Object.keys(BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE).join(', '));
    }
    // Check topping is the key of BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE[itemType]
    if (topping !== null && !Object.keys(BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE[itemType]).includes(topping)) {
        throw new Error('Invalid topping. Please choose from: ' + Object.keys(BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE[itemType]).join(', '));
    }

    let price = BREAKFAST_CUSTOMIZATIONS_TO_ADDITIONAL_PRICE[itemType][topping];
    return price;
};
export function calculatePrice4(drinkType, size, whippedCream = false, almond = false, chocolateSauce = 0, breakFastItemType = null, breakfastTopping = null) {
    let price = calculatePrice3(drinkType, size, whippedCream, almond, chocolateSauce);
    if (breakFastItemType !== null) {
        price += handleBreakFast(breakFastItemType, breakfastTopping);
    }
    return price;
}

// Add function calculatePrice5 that calculate a list of item instead of one item at a time.
//   1. Please add tax of 7.25% for the total price
//   2. Please also return the price break down for each item
export function calculatePrice5(items) {
    let totalPrice = 0;
    let priceBreakdown = [];
    for (let item of items) {
        let price = calculatePrice4(item.drinkType, item.size, item.whippedCream, item.almond, item.chocolateSauce, item.breakFastItemType, item.breakfastTopping);
        totalPrice += price;
        priceBreakdown.push({ item: item, price: price });
    }
    return { totalPrice: totalPrice * (1 + TAX), priceBreakdown: priceBreakdown };
}

