"use strict";
// tslint:disable max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const stream_1 = require("../readers/stream");
const settings_1 = require("../settings");
const tests = require("../tests/index");
const stream_2 = require("./stream");
class TestReaderStream extends stream_1.default {
    dynamic() {
        return this.fake({ path: 'dynamic' });
    }
    static() {
        return this.fake({ path: 'static' });
    }
    fake(value, error) {
        return new tests.FakeStream(value, error ? error : null, { encoding: 'utf-8', objectMode: true });
    }
}
class TestProviderStream extends stream_2.default {
    constructor(settings = new settings_1.default()) {
        super(settings);
        this.settings = settings;
        this._reader = new TestReaderStream(this.settings);
    }
}
class TestProviderWithEnoent extends TestProviderStream {
    api() {
        return this._reader.fake('dynamic', new tests.EnoentErrnoException());
    }
}
class TestProviderWithErrno extends TestProviderStream {
    api() {
        return this._reader.fake('dynamic', new Error('Boom'));
    }
}
/**
 * Wrapper for easily testing Stream API.
 */
const getEntries = (settings, task, api) => {
    return new Promise((resolve, reject) => {
        const entries = [];
        const provider = new api(settings);
        const stream = provider.read(task);
        stream.on('error', reject);
        stream.on('data', (entry) => entries.push(entry));
        stream.on('end', () => resolve(entries));
    });
};
function getTask(dynamic = true) {
    return {
        dynamic,
        base: 'fixtures',
        patterns: ['**/*'],
        positive: ['**/*'],
        negative: []
    };
}
describe('Providers → ProviderStream', () => {
    describe('Constructor', () => {
        it('should create instance of class', () => {
            const provider = new TestProviderStream();
            assert.ok(provider instanceof stream_2.default);
        });
    });
    describe('.read', () => {
        it('should returns entries for dynamic entries', async () => {
            const task = getTask();
            const settings = new settings_1.default();
            const expected = ['dynamic'];
            const actual = await getEntries(settings, task, TestProviderStream);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries for static entries', async () => {
            const task = getTask(/* dynamic */ false);
            const settings = new settings_1.default();
            const expected = ['static'];
            const actual = await getEntries(settings, task, TestProviderStream);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns entries (stats)', async () => {
            const task = getTask();
            const settings = new settings_1.default({ stats: true });
            const expected = [{ path: 'dynamic' }];
            const actual = await getEntries(settings, task, TestProviderStream);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns transformed entries', async () => {
            const task = getTask();
            const settings = new settings_1.default({ transform: () => 'cake' });
            const expected = ['cake'];
            const actual = await getEntries(settings, task, TestProviderStream);
            assert.deepStrictEqual(actual, expected);
        });
        it('should returns empty array if provided cwd does not exists', async () => {
            const task = getTask();
            const settings = new settings_1.default();
            const expected = [];
            const actual = await getEntries(settings, task, TestProviderWithEnoent);
            assert.deepStrictEqual(actual, expected);
        });
        it('should throw error', async () => {
            const task = getTask();
            const settings = new settings_1.default();
            try {
                await getEntries(settings, task, TestProviderWithErrno);
                throw new Error('Wow');
            }
            catch (err) {
                assert.strictEqual(err.message, 'Boom');
            }
        });
    });
});
