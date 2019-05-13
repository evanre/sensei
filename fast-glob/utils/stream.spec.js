"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const stream = require("stream");
const util = require("./stream");
describe('Utils → Stream', () => {
    describe('.merge', () => {
        it('should merge two streams into one stream', () => {
            const first = new stream.PassThrough();
            const second = new stream.PassThrough();
            const expected = 2;
            const mergedStream = util.merge([first, second]);
            const actual = mergedStream.listenerCount('close');
            assert.strictEqual(actual, expected);
        });
        it('should propagate errors into merged stream', (done) => {
            const first = new stream.PassThrough();
            const second = new stream.PassThrough();
            const expected = [1, 2, 3];
            const mergedStream = util.merge([first, second]);
            const actual = [];
            mergedStream.on('error', (err) => actual.push(err));
            mergedStream.on('finish', () => {
                assert.deepStrictEqual(actual, expected);
                done();
            });
            first.emit('error', 1);
            second.emit('error', 2);
            mergedStream.emit('error', 3);
        });
    });
});
