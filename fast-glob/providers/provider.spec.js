"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const settings_1 = require("../settings");
const tests = require("../tests");
const utils = require("../utils/index");
const provider_1 = require("./provider");
class TestProvider extends provider_1.default {
    read(_task) {
        return [];
    }
}
exports.TestProvider = TestProvider;
function getProvider(options) {
    const settings = new settings_1.default(options);
    return new TestProvider(settings);
}
exports.getProvider = getProvider;
describe('Providers → Provider', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const provider = getProvider();
            assert.ok(provider instanceof provider_1.default);
        });
    });
    describe('.getRootDirectory', () => {
        it('should return root directory for reader with global base (.)', () => {
            const provider = getProvider();
            const expected = process.cwd();
            const actual = provider.getRootDirectory({ base: '.' });
            assert.strictEqual(actual, expected);
        });
        it('should return root directory for reader with non-global base (fixtures)', () => {
            const provider = getProvider();
            const expected = path.join(process.cwd(), 'fixtures');
            const actual = provider.getRootDirectory({ base: 'fixtures' });
            assert.strictEqual(actual, expected);
        });
    });
    describe('.getReaderOptions', () => {
        it('should return options for reader with global base (.)', () => {
            const provider = getProvider();
            const actual = provider.getReaderOptions({
                base: '.',
                dynamic: true,
                patterns: ['**/*'],
                positive: ['**/*'],
                negative: []
            });
            assert.strictEqual(actual.basePath, '');
            assert.strictEqual(typeof actual.filter, 'function');
            assert.strictEqual(typeof actual.deep, 'function');
        });
        it('should return options for reader with non-global base (fixtures)', () => {
            const provider = getProvider();
            const actual = provider.getReaderOptions({
                base: 'fixtures',
                dynamic: true,
                patterns: ['**/*'],
                positive: ['**/*'],
                negative: []
            });
            assert.strictEqual(actual.basePath, 'fixtures');
            assert.strictEqual(typeof actual.filter, 'function');
            assert.strictEqual(typeof actual.deep, 'function');
        });
    });
    describe('.getMicromatchOptions', () => {
        it('should return options for micromatch', () => {
            const provider = getProvider();
            const expected = {
                dot: false,
                matchBase: false,
                nobrace: false,
                nocase: false,
                noext: false,
                noglobstar: false
            };
            const actual = provider.getMicromatchOptions();
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.transform', () => {
        describe('The «markDirectories» option', () => {
            it('should return mark directory when option is enabled', () => {
                const provider = getProvider({ markDirectories: true });
                const entry = tests.getDirectoryEntry();
                const expected = 'fixtures/directory/';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should return mark directory when option is enabled with the absolute option enabled', () => {
                const provider = getProvider({ markDirectories: true, absolute: true });
                const entry = tests.getDirectoryEntry();
                const fullpath = path.join(process.cwd(), 'fixtures/directory/');
                const expected = utils.path.unixify(fullpath);
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should do nothing with file when option is enabled', () => {
                const provider = getProvider({ markDirectories: true });
                const entry = tests.getFileEntry();
                const expected = 'fixtures/file.txt';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should return non-marked directory when option is disabled', () => {
                const provider = getProvider();
                const entry = tests.getDirectoryEntry();
                const expected = 'fixtures/directory';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
        });
        describe('The «absolute» option', () => {
            it('should return transformed entry when option is provided', () => {
                const provider = getProvider({ absolute: true });
                const entry = tests.getFileEntry();
                const fullpath = path.join(process.cwd(), 'fixtures', 'file.txt');
                const expected = utils.path.unixify(fullpath);
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should transform event absolute filepath when option is provided', () => {
                const provider = getProvider({ absolute: true });
                const entry = tests.getFileEntry({
                    path: `${process.cwd()}/fixtures/../file.txt`
                });
                const fullpath = path.join(process.cwd(), 'file.txt');
                const expected = utils.path.unixify(fullpath);
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should return do nothing when option is not provided', () => {
                const provider = getProvider();
                const entry = tests.getFileEntry();
                const expected = 'fixtures/file.txt';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
        });
        describe('The «transform» option', () => {
            it('should return transformed entry when option is provided', () => {
                const provider = getProvider({ transform: () => 'cake' });
                const entry = tests.getDirectoryEntry();
                const expected = 'cake';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
            it('should return do nothing when option is not provided', () => {
                const provider = getProvider();
                const entry = tests.getDirectoryEntry();
                const expected = 'fixtures/directory';
                const actual = provider.transform(entry);
                assert.strictEqual(actual, expected);
            });
        });
    });
    describe('.isEnoentCodeError', () => {
        it('should return true for ENOENT error', () => {
            const provider = getProvider();
            const error = new tests.EnoentErrnoException();
            const actual = provider.isEnoentCodeError(error);
            assert.ok(actual);
        });
        it('should return false for non-ENOENT error', () => {
            const provider = getProvider();
            const error = new Error();
            const actual = provider.isEnoentCodeError(error);
            assert.ok(!actual);
        });
    });
});
