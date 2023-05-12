import { SIZE_TO_ADDITIONAL_PRICE, DRINK_TYPE_TO_BASE_PRICE, BREAKFAST_TOPPING_TO_ADDITIONAL_PRICE } from "./constants";

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
function calculatePrice1(drinkType, size, whippedCream) {
    if (!['hot', 'cold', 'blended'].includes(drinkType)) {
        throw new Error('Invalid drink type. Please choose from hot, cold, or blended.');
    }
    if (!size in ['S', 'M', 'L']) {
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
    if (whippedCream) {
        price += 0.5;
    }
    return price;
}

// Implement function calculatePrice2 that
//   1. add XL size which will cost $1.5 additionally
//   2. Add milk tea drink type with a base price of $2.25
//   3. Add milk options where whole milk or almond milk with almond cost additional 50c
function calculatePrice2(drinkType, size, whippedCream, milk) {
    if (!['hot', 'cold', 'blended', 'milk_tea'].includes(drinkType)) {
        throw new Error('Invalid drink type. Please choose from hot, cold, blended, or milk_tea.');
    }
    if (!size in ['S', 'M', 'L', 'XL']) {
        throw new Error('Invalid size. Please choose from S, M, L, or XL.');
    }
    if (typeof whippedCream !== 'boolean') {
        throw new Error('Invalid whipped cream value. Please choose true or false.');
    }
    if (typeof milk !== 'boolean') {
        throw new Error('Invalid milk value. Please choose true or false.');
    }
    if (size === 'XL' && !['cold', 'blended'].includes(drinkType)) {
        throw new Error('XL size is only available for cold and blended drinks.');
    }

    var price = DRINK_TYPE_TO_BASE_PRICE[drinkType];
    price += SIZE_TO_ADDITIONAL_PRICE[size];
    if (whippedCream) {
        price += 0.5;
    }
    if (milk) {
        price += 0.5;
    }
    return price;
}

// Add function calculatePrice3 which allow customization options for chocolate sauce, which can only be added to hot drinks and has the following pricing:
//   1. The first 2 pumps are free
//   2. $0.5 for each extra pump
//   3. Maximum of 6 pumps
function calculatePrice3(drinkType, size, whippedCream, chocolateSauce=0) {
    if (!['hot', 'cold', 'blended', 'milk_tea'].includes(drinkType)) {
        throw new Error('Invalid drink type. Please choose from hot, cold, blended, or milk_tea.');
    }
    if (!size in ['S', 'M', 'L', 'XL']) {
        throw new Error('Invalid size. Please choose from S, M, L, or XL.');
    }
    if (typeof whippedCream !== 'boolean') {
        throw new Error('Invalid whipped cream value. Please choose true or false.');
    }
    if (typeof chocolateSauce !== 'number') {
        throw new Error('Invalid chocolate sauce value. Please choose a number.');
    }
    if (size === 'XL' && !['cold', 'blended'].includes(drinkType)) {
        throw new Error('XL size is only available for cold and blended drinks.');
    }
    if (chocolateSauce < 0 || chocolateSauce > 6) {
        throw new Error('Invalid chocolate sauce value. Please choose between 0 and 6.');
    }

    var price = DRINK_TYPE_TO_BASE_PRICE[drinkType];
    price += SIZE_TO_ADDITIONAL_PRICE[size];
    if (whippedCream) {
        price += 0.5;
    }
    if (chocolateSauce > 2) {
        price += (chocolateSauce - 2) * 0.5;
    }
    return price;
}


// Add function calculatePrice4 that can handle the customization options for breakfast items, which includes sandwiches and bagels with the following specifications:
//   1. Both has base price of $3
//   2. Sandwiches can be egg or turkey for $1 additionally
//   3. Bagels can have butter or cream cheese toppings for 50c additionally
//   4. There is no size for food items
function calculatePrice4(itemType, topping=null) {
    if (!['sandwich', 'bagel'].includes(itemType)) {
        throw new Error('Invalid item type. Please choose from sandwich or bagel.');
    }
    if (itemType === 'sandwich' && !['egg', 'turkey', null].includes(topping)) {
        throw new Error('Invalid topping. Please choose from egg or turkey.');
    }
    if (itemType === 'bagel' && !['butter', 'cream_cheese', null].includes(topping)) {
        throw new Error('Invalid topping. Please choose from butter or cream_cheese.');
    }

    var price = 3;
    if (itemType === 'sandwich' && topping !== null) {
        price += 1;
    }
    if (itemType === 'bagel' && topping !== null) {
        price += 0.5;
    }
};

// Add function calculatePrice5 that calculate a list of item instead of one item at a time.
//   1. Please add tax of 7.25% for the total price
//   2. Please also return the price break down for each item
function calculateItem(drinkType, size, whippedCream, chocolateSauce=0, breakFastItemType=null, breakfastTopping=null) {
    let price = calculatePrice3(drinkType, size, whippedCream, chocolateSauce);
    if (breakFastItemType !== null) {
        price += calculatePrice4(breakFastItemType, breakfastTopping);
    }
    return price;
}
function calculatePrice5(items) {
    let totalPrice = 0;
    let priceBreakdown = [];
    for (let item of items) {
        let price = calculateItem(item.drinkType, item.size, item.whippedCream, item.chocolateSauce, item.breakFastItemType, item.breakfastTopping);
        totalPrice += price;
        priceBreakdown.push({item: item, price: price});
    }
    return {totalPrice: totalPrice * 1.0725, priceBreakdown: priceBreakdown};
}
