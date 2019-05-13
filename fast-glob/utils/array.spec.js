"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const util = require("./array");
describe('Utils → Array', () => {
    describe('.flatten', () => {
        it('should return non-nested array', () => {
            const expected = ['a', 'b'];
            const actual = util.flatten([['a'], ['b']]);
            assert.deepStrictEqual(actual, expected);
        });
    });
});
