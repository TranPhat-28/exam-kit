export const A4_PAPER_WIDTH_CENTIMETERS = 21;

export const centimetersToTwips = (centimeters: number) =>
    Math.round((centimeters * 1440) / 2.54);

export const measureTextInCentimeters = (
    text: string,
    canvasContext: CanvasRenderingContext2D | null,
) =>
    canvasContext
        ? (canvasContext.measureText(text).width * 2.54) / 96
        : text.length * 0.22;

export const padDottedPlaceholderToEndOfPrefix = (
    prefix: string,
    addColonDelimiter: boolean = false,
) => {
    return addColonDelimiter
        ? `${prefix}: ...............`
        : `${prefix} ...............`;
};

export const joinPrefixWithValue = (
    prefix: string,
    value: string,
    addColonDelimiter: boolean = false,
) => {
    return addColonDelimiter ? `${prefix}: ${value}` : `${prefix} ${value}`;
};
