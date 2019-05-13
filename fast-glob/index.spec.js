"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const pkg = require("./index");
describe('Package', () => {
    describe('.sync', () => {
        it('should throw an error when input values can not pass validation', () => {
            /* tslint:disable-next-line no-any */
            assert.throws(() => pkg.sync(null), /TypeError: Patterns must be a string or an array of strings/);
        });
        it('should returns entries', () => {
            const expected = [
                'fixtures/file.md',
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = pkg.sync(['fixtures/**/*.md']);
            actual.sort();
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries (two sources)', () => {
            const expected = [
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = pkg.sync(['fixtures/first/**/*.md', 'fixtures/second/**/*.md']);
            actual.sort();
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.async', () => {
        it('should throw an error when input values can not pass validation', async () => {
            try {
                /* tslint:disable-next-line no-any */
                await pkg.async(null);
                throw new Error('An unexpected error was found.');
            }
            catch (error) {
                assert.strictEqual(error.toString(), 'TypeError: Patterns must be a string or an array of strings');
            }
        });
        it('should returns entries', async () => {
            const expected = [
                'fixtures/file.md',
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = await pkg.async(['fixtures/**/*.md']);
            actual.sort();
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries (two sources)', async () => {
            const expected = [
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = await pkg.async(['fixtures/first/**/*.md', 'fixtures/second/**/*.md']);
            actual.sort();
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.stream', () => {
        it('should throw an error when input values can not pass validation', () => {
            /* tslint:disable-next-line no-any */
            assert.throws(() => pkg.stream(null), /TypeError: Patterns must be a string or an array of strings/);
        });
        it('should returns entries', (done) => {
            const expected = [
                'fixtures/file.md',
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = [];
            const stream = pkg.stream(['fixtures/**/*.md']);
            stream.on('data', (entry) => actual.push(entry));
            stream.on('error', (err) => assert.fail(err));
            stream.on('end', () => {
                actual.sort();
                assert.deepStrictEqual(actual, expected);
                done();
            });
        });
        it('should returns entries (two sources)', (done) => {
            const expected = [
                'fixtures/first/file.md',
                'fixtures/first/nested/directory/file.md',
                'fixtures/first/nested/file.md',
                'fixtures/second/file.md',
                'fixtures/second/nested/directory/file.md',
                'fixtures/second/nested/file.md'
            ];
            const actual = [];
            const stream = pkg.stream(['fixtures/first/**/*.md', 'fixtures/second/**/*.md']);
            stream.on('data', (entry) => actual.push(entry));
            stream.on('error', (err) => assert.fail(err));
            stream.on('end', () => {
                actual.sort();
                assert.deepStrictEqual(actual, expected);
                done();
            });
        });
    });
    describe('.generateTasks', () => {
        it('should throw an error when input values can not pass validation', () => {
            /* tslint:disable-next-line no-any */
            assert.throws(() => pkg.generateTasks(null), /TypeError: Patterns must be a string or an array of strings/);
        });
        it('should return tasks', () => {
            const expected = [{
                    base: '.',
                    dynamic: true,
                    patterns: ['*'],
                    positive: ['*'],
                    negative: []
                }];
            const actual = pkg.generateTasks(['*']);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return tasks with negative patterns', () => {
            const expected = [{
                    base: '.',
                    dynamic: true,
                    patterns: ['*', '!*.txt', '!*.md'],
                    positive: ['*'],
                    negative: ['*.txt', '*.md']
                }];
            const actual = pkg.generateTasks(['*', '!*.txt'], { ignore: ['*.md'] });
            assert.deepStrictEqual(actual, expected);
        });
    });
});
