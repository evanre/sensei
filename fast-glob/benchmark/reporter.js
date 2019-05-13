"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reporter {
    constructor(results) {
        this.results = results;
    }
    toString() {
        return this.header + '\n' + this.measures + ' | ' + this.meta;
    }
    get header() {
        return this.results.name;
    }
    get meta() {
        const matches = 'Entries: ' + this.units(this.results.entries, '');
        const errors = 'Errors: ' + this.units(this.results.errors, '');
        const retries = 'Retries: ' + this.units(this.results.retries, '');
        return [matches, errors, retries].join(' | ');
    }
    get measures() {
        return Object.keys(this.results.measures).map(this.measure, this).join(' | ');
    }
    measure(name) {
        const data = this.results.measures[name];
        return [
            '(' + name.toUpperCase() + ')',
            this.units(data.average, data.units, 3),
            '±' + this.units(data.stdev, '%', 3)
        ].join(' ');
    }
    units(value, units, faction) {
        return value.toFixed(faction).toString() + units;
    }
}
exports.default = Reporter;
