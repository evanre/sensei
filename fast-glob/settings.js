"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    constructor(_options = {}) {
        this._options = _options;
        this.cwd = this._getValue(this._options.cwd, process.cwd());
        this.deep = this._getValue(this._options.deep, true);
        this.ignore = this._getValue(this._options.ignore, []);
        this.dot = this._getValue(this._options.dot, false);
        this.stats = this._getValue(this._options.stats, false);
        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
        this.followSymlinkedDirectories = this._getValue(this._options.followSymlinkedDirectories, true);
        this.unique = this._getValue(this._options.unique, true);
        this.markDirectories = this._getValue(this._options.markDirectories, false);
        this.absolute = this._getValue(this._options.absolute, false);
        this.brace = this._getValue(this._options.brace, true);
        this.globstar = this._getValue(this._options.globstar, true);
        this.extglob = this._getValue(this._options.extglob, true);
        this.case = this._getValue(this._options.case, true);
        this.matchBase = this._getValue(this._options.matchBase, false);
        this.transform = this._getValue(this._options.transform, null);
        if (this.onlyDirectories) {
            this.onlyFiles = false;
        }
    }
    _getValue(option, value) {
        return option === undefined ? value : option;
    }
}
exports.default = Settings;
