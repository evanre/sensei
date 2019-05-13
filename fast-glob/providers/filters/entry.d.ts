import Settings from '../../settings';
import { EntryFilterFunction, MicromatchOptions, Pattern } from '../../types/index';
export default class EntryFilter {
    private readonly settings;
    private readonly micromatchOptions;
    readonly index: Map<string, undefined>;
    constructor(settings: Settings, micromatchOptions: MicromatchOptions);
    /**
     * Returns filter for directories.
     */
    getFilter(positive: Pattern[], negative: Pattern[]): EntryFilterFunction;
    /**
     * Returns true if entry must be added to result.
     */
    private filter;
    /**
     * Return true if the entry already has in the cross reader index.
     */
    private isDuplicateEntry;
    /**
     * Create record in the cross reader index.
     */
    private createIndexRecord;
    /**
     * Returns true for non-files if the «onlyFiles» option is enabled.
     */
    private onlyFileFilter;
    /**
     * Returns true for non-directories if the «onlyDirectories» option is enabled.
     */
    private onlyDirectoryFilter;
    /**
     * Return true when `absolute` option is enabled and matched to the negative patterns.
     */
    private isSkippedByAbsoluteNegativePatterns;
    /**
     * Return true when entry match to provided patterns.
     *
     * First, just trying to apply patterns to the path.
     * Second, trying to apply patterns to the path with final slash (need to micromatch to support «directory/**» patterns).
     */
    private isMatchToPatterns;
}
