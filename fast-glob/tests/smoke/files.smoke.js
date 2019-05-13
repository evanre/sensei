"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smoke = require("./smoke");
smoke.suite('Smoke → Files', [
    {
        pattern: 'fixtures/*',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    },
    {
        pattern: 'fixtures/**',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    },
    {
        pattern: 'fixtures/**/*',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    }
]);
smoke.suite('Smoke → Files (cwd)', [
    {
        pattern: '*',
        cwd: 'fixtures',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    },
    {
        pattern: '**',
        cwd: 'fixtures',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    },
    {
        pattern: '**/*',
        cwd: 'fixtures',
        globOptions: { nodir: true },
        fgOptions: { onlyFiles: true }
    }
]);
