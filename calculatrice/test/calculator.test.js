const { add, subtract, multiply, divide } = require('../calculator');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
});

test('multiplies 3 * 2 to equal 6', () => {
    expect(multiply(3, 2)).toBe(6);
});

test('divides 6 / 2 to equal 3', () => {
    expect(divide(6, 2)).toBe(3);
});

test('throws error when dividing by zero', () => {
    expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
});

test('throws error on invalid input', () => {
    expect(() => add(1, 'a')).toThrow('Invalid input');
});
