"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const smoke = require("./smoke");
smoke.suite('Smoke → Static', [
    { pattern: 'fixtures' },
    { pattern: 'fixtures/file.md' },
    { pattern: 'fixtures/first' }
]);
smoke.suite('Smoke → Static (cwd)', [
    { pattern: 'file.md', cwd: 'fixtures' },
    { pattern: 'first', cwd: 'fixtures' }
]);
smoke.suite('Smoke → Static (ignore)', [
    // Files
    [
        { pattern: 'fixtures/file.md', ignore: 'file.md' },
        { pattern: 'fixtures/file.md', ignore: '*.md' },
        { pattern: 'fixtures/file.md', ignore: '*' },
        { pattern: 'fixtures/file.md', ignore: '**' },
        { pattern: 'fixtures/file.md', ignore: '**/*' },
        { pattern: 'fixtures/file.md', ignore: 'fixtures/file.md' },
        { pattern: 'fixtures/file.md', ignore: 'fixtures/*.md' },
        { pattern: 'fixtures/file.md', ignore: 'fixtures/*' },
        { pattern: 'fixtures/file.md', ignore: 'fixtures/**' },
        { pattern: 'fixtures/file.md', ignore: 'fixtures/**/*' }
    ],
    // Directories
    [
        { pattern: 'fixtures/first', ignore: 'first' },
        { pattern: 'fixtures/first', ignore: '*' },
        { pattern: 'fixtures/first', ignore: '**' },
        { pattern: 'fixtures/first', ignore: '**/*' },
        { pattern: 'fixtures/first', ignore: 'fixtures/first' },
        { pattern: 'fixtures/first', ignore: 'fixtures/*' },
        { pattern: 'fixtures/first', ignore: 'fixtures/**' },
        { pattern: 'fixtures/first', ignore: 'fixtures/**/*' }
    ]
]);
smoke.suite('Smoke → Static (ignore & cwd)', [
    // Files
    [
        { pattern: 'fixtures/file.md', ignore: 'file.md', cwd: 'fixtures' },
        { pattern: 'fixtures/file.md', ignore: '*.md', cwd: 'fixtures' },
        { pattern: 'fixtures/file.md', ignore: '*', cwd: 'fixtures' },
        { pattern: 'fixtures/file.md', ignore: '**', cwd: 'fixtures' },
        { pattern: 'fixtures/file.md', ignore: '**/*', cwd: 'fixtures' }
    ],
    // Directories
    [
        { pattern: 'fixtures/first', ignore: 'first', cwd: 'fixtures' },
        { pattern: 'fixtures/first', ignore: '*', cwd: 'fixtures' },
        { pattern: 'fixtures/first', ignore: '**', cwd: 'fixtures' },
        { pattern: 'fixtures/first', ignore: '**/*', cwd: 'fixtures' }
    ]
]);
smoke.suite('Smoke → Static (relative)', [
    { pattern: '../file.md', cwd: 'fixtures/first' },
    { pattern: '../../file.md', cwd: 'fixtures/first/nested' }
]);
smoke.suite('Smoke → Static (stats)', [
    {
        issue: 144,
        pattern: 'fixtures/file.md',
        fgOptions: {
            stats: true,
            transform: (entry) => {
                assert.ok(entry.isFile());
                return entry.path;
            }
        }
    }
]);
