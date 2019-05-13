"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const settings_1 = require("../settings");
const manager = require("./tasks");
describe('Managers → Task', () => {
    describe('.generate', () => {
        it('should return task with negative patterns from «ignore» option', () => {
            const settings = new settings_1.default({ ignore: ['*.txt'] });
            const expected = [{
                    base: 'a',
                    dynamic: true,
                    patterns: ['a/*', '!*.md', '!*.txt'],
                    positive: ['a/*'],
                    negative: ['*.md', '*.txt']
                }];
            const actual = manager.generate(['a/*', '!*.md'], settings);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return static and dynamic tasks', () => {
            const settings = new settings_1.default({ ignore: ['*.txt'] });
            const expected = [
                {
                    base: 'a',
                    dynamic: false,
                    patterns: ['a/file.json', '!b/*.md', '!*.txt'],
                    positive: ['a/file.json'],
                    negative: ['b/*.md', '*.txt']
                },
                {
                    base: 'b',
                    dynamic: true,
                    patterns: ['b/*', '!b/*.md', '!*.txt'],
                    positive: ['b/*'],
                    negative: ['b/*.md', '*.txt']
                }
            ];
            const actual = manager.generate(['a/file.json', 'b/*', '!b/*.md'], settings);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return only dynamic patterns when the `case` option is enabled', () => {
            const settings = new settings_1.default({ case: false });
            const expected = [
                {
                    base: 'a',
                    dynamic: true,
                    patterns: ['a/file.json', '!b/*.md'],
                    positive: ['a/file.json'],
                    negative: ['b/*.md']
                },
                {
                    base: 'b',
                    dynamic: true,
                    patterns: ['b/*', '!b/*.md'],
                    positive: ['b/*'],
                    negative: ['b/*.md']
                }
            ];
            const actual = manager.generate(['a/file.json', 'b/*', '!b/*.md'], settings);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.convertPatternsToTasks', () => {
        it('should return global task when positive patterns have a global pattern', () => {
            const expected = [{
                    base: '.',
                    dynamic: true,
                    patterns: ['*', '!*.md'],
                    positive: ['*'],
                    negative: ['*.md']
                }];
            const actual = manager.convertPatternsToTasks(['*'], ['*.md'], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return global task with negative patterns from «ignore» patterns', () => {
            const expected = [{
                    base: '.',
                    dynamic: true,
                    patterns: ['*', '!*.md'],
                    positive: ['*'],
                    negative: ['*.md']
                }];
            const actual = manager.convertPatternsToTasks(['*'], ['*.md'], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return two tasks', () => {
            const expected = [
                {
                    base: 'a',
                    dynamic: true,
                    patterns: ['a/*', '!b/*.md'],
                    positive: ['a/*'],
                    negative: ['b/*.md']
                },
                {
                    base: 'b',
                    dynamic: true,
                    patterns: ['b/*', '!b/*.md'],
                    positive: ['b/*'],
                    negative: ['b/*.md']
                }
            ];
            const actual = manager.convertPatternsToTasks(['a/*', 'b/*'], ['b/*.md'], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.getPositivePatterns', () => {
        it('should return only positive patterns', () => {
            const expected = ['*'];
            const actual = manager.getPositivePatterns(['*', '!*.md']);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.getNegativePatternsAsPositive', () => {
        it('should return negative patterns as positive', () => {
            const expected = ['*.md'];
            const actual = manager.getNegativePatternsAsPositive(['*', '!*.md'], []);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return negative patterns as positive with patterns from ignore option', () => {
            const expected = ['*.md', '*.txt', '*.json'];
            const actual = manager.getNegativePatternsAsPositive(['*', '!*.md'], ['*.txt', '!*.json']);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.groupPatternsByBaseDirectory', () => {
        it('should return empty object', () => {
            const expected = {};
            const actual = manager.groupPatternsByBaseDirectory([]);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return grouped patterns', () => {
            const expected = {
                '.': ['*'],
                a: ['a/*']
            };
            const actual = manager.groupPatternsByBaseDirectory(['*', 'a/*']);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.convertPatternGroupToTask', () => {
        it('should return created dynamic task', () => {
            const expected = {
                base: '.',
                dynamic: true,
                patterns: ['*', '!*.md'],
                positive: ['*'],
                negative: ['*.md']
            };
            const actual = manager.convertPatternGroupToTask('.', ['*'], ['*.md'], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return created static task', () => {
            const expected = {
                base: '.',
                dynamic: false,
                patterns: ['file', '!file.md'],
                positive: ['file'],
                negative: ['file.md']
            };
            const actual = manager.convertPatternGroupToTask('.', ['file'], ['file.md'], /* dynamic */ false);
            assert.deepStrictEqual(actual, expected);
        });
    });
    describe('.convertPatternGroupsToTasks', () => {
        it('should return one task without negative patterns', () => {
            const expected = [{
                    base: 'a',
                    dynamic: true,
                    patterns: ['a/*'],
                    positive: ['a/*'],
                    negative: []
                }];
            const actual = manager.convertPatternGroupsToTasks({ a: ['a/*'] }, [], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
        it('should return two tasks with negative patterns', () => {
            const expected = [
                {
                    base: 'a',
                    dynamic: true,
                    patterns: ['a/*', '!b/*.md'],
                    positive: ['a/*'],
                    negative: ['b/*.md']
                },
                {
                    base: 'b',
                    dynamic: true,
                    patterns: ['b/*', '!b/*.md'],
                    positive: ['b/*'],
                    negative: ['b/*.md']
                }
            ];
            const actual = manager.convertPatternGroupsToTasks({ a: ['a/*'], b: ['b/*'] }, ['b/*.md'], /* dynamic */ true);
            assert.deepStrictEqual(actual, expected);
        });
    });
});
