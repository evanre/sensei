export declare function convertHrtimeToMilliseconds(hrtime: [number, number]): number;
export declare function convertBytesToMegaBytes(bytes: number): number;
export declare function timeStart(): [number, number];
export declare function timeEnd(start: [number, number]): number;
export declare function getMemory(): number;
export declare function getMeasures(matches: number, time: number, memory: number): string;
export declare function getAverageValue(raw: number[]): number;
export declare function getStdev(raw: number[]): number;
export declare function getEnvAsInteger(name: string): number | undefined;
