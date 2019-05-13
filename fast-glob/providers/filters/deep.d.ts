import Settings from '../../settings';
import { EntryFilterFunction, MicromatchOptions, Pattern } from '../../types/index';
export default class DeepFilter {
    private readonly settings;
    private readonly micromatchOptions;
    constructor(settings: Settings, micromatchOptions: MicromatchOptions);
    /**
     * Returns filter for directories.
     */
    getFilter(positive: Pattern[], negative: Pattern[]): EntryFilterFunction;
    /**
     * Returns max depth of the provided patterns.
     */
    private getMaxPatternDepth;
    /**
     * Returns RegExp's for patterns that can affect the depth of reading.
     */
    private getNegativePatternsRe;
    /**
     * Returns «true» for directory that should be read.
     */
    private filter;
    /**
     * Returns «true» when the «deep» option is disabled or number and depth of the entry is greater that the option value.
     */
    private isSkippedByDeepOption;
    /**
     * Returns «true» when depth parameter is not an Infinity and entry depth greater that the parameter value.
     */
    private isSkippedByMaxPatternDepth;
    /**
     * Returns «true» for symlinked directory if the «followSymlinkedDirectories» option is disabled.
     */
    private isSkippedSymlinkedDirectory;
    /**
     * Returns «true» for a directory whose name starts with a period if «dot» option is disabled.
     */
    private isSkippedDotDirectory;
    /**
     * Returns «true» for a directory whose path math to any negative pattern.
     */
    private isSkippedByNegativePatterns;
}
