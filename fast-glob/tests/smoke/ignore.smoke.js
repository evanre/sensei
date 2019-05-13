"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smoke = require("./smoke");
smoke.suite('Smoke → Ignore', [
    {
        pattern: 'fixtures/**/*',
        globOptions: { ignore: ['**/*.md'] },
        fgOptions: { ignore: ['**/*.md'] }
    },
    {
        pattern: 'fixtures/**/*',
        globOptions: { ignore: ['**/*.md'] },
        fgOptions: { ignore: ['!**/*.md'] }
    }
]);
