let price = parseFloat (prompt ('enter price', ''));
let discount = parseFloat (prompt ('enter discount %', ''));
let discountedPrice;
let msg;

if (price < 0 || price > 9999999 || discount > 99 || discount < 0 || isNaN(price) || isNaN(discount)) {
    msg = `Invalid input data`
} else {
    discountedPrice = price - price * (discount / 100)
    msg = `Price without discount: ${+(price).toFixed(2)}
Discount: ${+(discount).toFixed(2)}
Price with discount ${+(discountedPrice).toFixed(2)}`
}

alert(msg);
