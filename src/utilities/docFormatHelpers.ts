export const centimetersToTwips = (centimeters: number) =>
    Math.round((centimeters * 1440) / 2.54);

export const measureTextInCentimeters = (
    text: string,
    canvasContext: CanvasRenderingContext2D | null,
) =>
    canvasContext
        ? (canvasContext.measureText(text).width * 2.54) / 96
        : text.length * 0.22;
