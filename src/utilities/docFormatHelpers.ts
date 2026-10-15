import { dottedLineFillRatios } from "../types/GenericType";

export const centimetersToTwips = (centimeters: number) =>
    Math.round((centimeters * 1440) / 2.54);

export const measureTextInCentimeters = (
    text: string,
    canvasContext: CanvasRenderingContext2D | null,
) =>
    canvasContext
        ? (canvasContext.measureText(text).width * 2.54) / 96
        : text.length * 0.22;

export const makeDottedLine = (
    docx: typeof import("docx"),
    label: string,
    contentWidthCentimeters: number,
    fillTo: keyof typeof dottedLineFillRatios = "end",
) => {
    const { LeaderType, Paragraph, Tab, TabStopType, TextRun } = docx;

    new Paragraph({
        children: [
            new TextRun({
                children: [label, new Tab()],
                font: "Times New Roman",
                size: 24,
            }),
        ],
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: centimetersToTwips(
                    contentWidthCentimeters * dottedLineFillRatios[fillTo],
                ),
                leader: LeaderType.DOT,
            },
        ],
    });
};
