/**
 * Returns «true» if the last partial of the path starting with a period.
 */
export declare function isDotDirectory(filepath: string): boolean;
/**
 * Convert a windows-like path to a unix-style path.
 */
export declare function unixify(filepath: string): string;
/**
 * Returns absolute path for provided filepath relative to cwd.
 */
export declare function makeAbsolute(cwd: string, filepath: string): string;
