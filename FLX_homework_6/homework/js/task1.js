
let a = parseFloat (prompt('enter a', ''));
let b = parseFloat (prompt('enter b', ''));
let c = parseFloat (prompt('enter c', ''));
let discriminant;
let x;
let x2;

if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert ('Invalid input data');
} else {
    discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        alert ('no solution')
    } else if (discriminant === 0) {
        x = -b / 2 * a;
        alert ('x = ' + x);
    } else {
        x = (-b + Math.sqrt(discriminant)) / (2 * a);
        x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        alert ('x = ' + x + ' and x2 = ' + x2);
    }
}
