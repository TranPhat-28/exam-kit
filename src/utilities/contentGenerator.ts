import type { Paragraph } from "docx";
import { CONSTANTS } from "../constants/strings";
import type {
    ExamSection,
    HeaderTextSettings,
} from "../store/types/examContentSlice/types";
import type { LayoutSettingsState } from "../store/types/layoutSettingsSlice/types";
import { dottedLineFillRatios } from "../types/GenericType";
import type { HeaderType } from "../types/HeaderType";
import { SectionType } from "../types/SectionType";
import {
    A4_PAPER_WIDTH_CENTIMETERS,
    centimetersToTwips,
    joinPrefixWithValue,
    measureTextInCentimeters,
} from "./docFormatHelpers";

export const generateHeader = (
    docx: typeof import("docx"),
    headerType: HeaderType,
    layoutSettings: LayoutSettingsState,
    headerText: HeaderTextSettings,
) => {
    const {
        AlignmentType,
        BorderStyle,
        LeaderType,
        Paragraph,
        Tab,
        TabStopType,
        Table,
        TableCell,
        TableRow,
        TextRun,
        WidthType,
    } = docx;

    // Paragraph creation helper
    const makeParagraph = (
        text: string,
        options: {
            alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
            bold?: boolean;
            italics?: boolean;
            spacing?: { before?: number; after?: number };
            indent?: { left?: number; right?: number };
        } = {},
    ) =>
        new Paragraph({
            children: [
                new TextRun({
                    text,
                    font: layoutSettings.fontFamily,
                    size: layoutSettings.fontSize * 2,
                    bold: options.bold,
                    italics: options.italics,
                }),
            ],
            alignment: options.alignment,
            spacing: options.spacing,
            indent: options.indent,
        });

    const contentWidthCentimeters =
        A4_PAPER_WIDTH_CENTIMETERS -
        layoutSettings.margins.left -
        layoutSettings.margins.right;

    // Dot-leading tab stop creation helper
    const makeDottedLine = (
        label: string,
        fillTo: keyof typeof dottedLineFillRatios = "end",
    ) =>
        new Paragraph({
            children: [
                new TextRun({
                    children: [label, new Tab()],
                    font: layoutSettings.fontFamily,
                    size: layoutSettings.fontSize * 2,
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

    if (headerType === "none") {
        return [];
    }

    if (headerType === "simple") {
        return [
            makeDottedLine(CONSTANTS.exam.header.prefixes.studentName, "1/3"),
            makeDottedLine(CONSTANTS.exam.header.prefixes.className, "1/3"),
            makeParagraph("BÀI TẬP", {
                alignment: AlignmentType.CENTER,
                bold: true,
                spacing: { before: 240, after: 240 },
            }),
        ];
    }

    const cellBorders = {
        top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
    };

    const cellMargins = { top: 120, bottom: 120, left: 160, right: 160 };

    const officialLabelTable = new Table({
        width: { size: 80, type: WidthType.PERCENTAGE },
        alignment: AlignmentType.CENTER,
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        borders: cellBorders,
                        margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [
                            makeParagraph(
                                CONSTANTS.exam.header.fixedValues.official,
                                {
                                    alignment: AlignmentType.CENTER,
                                    bold: true,
                                },
                            ),
                        ],
                    }),
                ],
            }),
        ],
    });

    const headerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 40, type: WidthType.PERCENTAGE },
                        borders: cellBorders,
                        margins: cellMargins,
                        children: [
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes
                                        .educationAuthority,
                                    headerText.educationAuthorityName,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                },
                            ),
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes.school,
                                    headerText.schoolName,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                    bold: true,
                                    spacing: { after: 160 },
                                },
                            ),
                            officialLabelTable,
                        ],
                    }),
                    new TableCell({
                        width: { size: 60, type: WidthType.PERCENTAGE },
                        borders: cellBorders,
                        margins: cellMargins,
                        children: [
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes.examTitle,
                                    headerText.examTitle,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                    bold: true,
                                },
                            ),
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes.academicYear,
                                    headerText.academicYear,
                                    true,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                },
                            ),
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes.subject,
                                    headerText.subject,
                                    true,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                    spacing: { after: 160 },
                                },
                            ),
                            makeParagraph(
                                joinPrefixWithValue(
                                    CONSTANTS.exam.header.prefixes.duration,
                                    headerText.duration,
                                    true,
                                ),
                                {
                                    alignment: AlignmentType.CENTER,
                                    italics: true,
                                    spacing: { before: 160 },
                                    indent: {
                                        left: centimetersToTwips(0.8),
                                        right: centimetersToTwips(0.8),
                                    },
                                },
                            ),
                            makeParagraph(
                                CONSTANTS.exam.header.prefixes.durationNote,
                                {
                                    alignment: AlignmentType.CENTER,
                                    italics: true,
                                },
                            ),
                        ],
                    }),
                ],
            }),
        ],
    });

    const examCodeTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 75, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NIL },
                            bottom: { style: BorderStyle.NIL },
                            left: { style: BorderStyle.NIL },
                            right: { style: BorderStyle.NIL },
                        },
                        children: [makeParagraph("")],
                    }),
                    new TableCell({
                        width: { size: 20, type: WidthType.PERCENTAGE },
                        borders: cellBorders,
                        margins: cellMargins,
                        children: [
                            makeParagraph(
                                CONSTANTS.exam.header.prefixes.examCode,
                                {
                                    alignment: AlignmentType.CENTER,
                                    bold: true,
                                },
                            ),
                        ],
                    }),
                    new TableCell({
                        width: { size: 5, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NIL },
                            bottom: { style: BorderStyle.NIL },
                            left: { style: BorderStyle.NIL },
                            right: { style: BorderStyle.NIL },
                        },
                        children: [makeParagraph("")],
                    }),
                ],
            }),
        ],
    });

    return [
        headerTable,
        makeParagraph("", {
            spacing: { after: 120 },
        }),
        examCodeTable,
        makeDottedLine(CONSTANTS.exam.header.prefixes.studentName, "1/3"),
        makeDottedLine(CONSTANTS.exam.header.prefixes.studentNumber, "1/3"),
        makeDottedLine(CONSTANTS.exam.header.prefixes.className, "1/3"),
    ];
};

export const generateContent = (
    docx: typeof import("docx"),
    sections: ExamSection[],
    layoutSettings: LayoutSettingsState,
    canvasContext: CanvasRenderingContext2D | null,
): Paragraph[] => {
    const { Paragraph, TabStopType, TextRun } = docx;

    const content = sections.flatMap((section) => {
        const paragraphs = [
            new Paragraph({
                children: [
                    new TextRun({
                        text: section.content.instruction,
                        font: layoutSettings.fontFamily,
                        bold: true,
                        size: layoutSettings.fontSize * 2,
                    }),
                ],
                spacing: { before: 240, after: 120 },
            }),
        ];

        if (section.content.type === SectionType.ReadingComprehension) {
            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: section.content.paragraph,
                            font: layoutSettings.fontFamily,
                            size: layoutSettings.fontSize * 2,
                        }),
                    ],
                    spacing: { after: 120 },
                }),
            );
        }

        section.content.questions.forEach((question) => {
            if (
                "question" in question &&
                typeof question.question === "string"
            ) {
                paragraphs.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: question.question,
                                font: layoutSettings.fontFamily,
                                bold: true,
                                size: layoutSettings.fontSize * 2,
                            }),
                        ],
                        spacing: { before: 120, after: 60 },
                    }),
                );
            }

            const answerOptions = question.options.map(
                (option, optionIndex) =>
                    `${String.fromCharCode(65 + optionIndex)}. ${option}`,
            );
            const optionOffsets = layoutSettings.multipleChoiceOptionOffsets;
            const adjacentSpaces = optionOffsets
                .slice(1)
                .map((offset, index) => offset - optionOffsets[index]);
            const smallestAdjacentSpace = Math.min(...adjacentSpaces);
            const firstToThirdOffsetSpace = optionOffsets[2] - optionOffsets[0];
            const longestAnswerWidth = Math.max(
                ...answerOptions.map((option) =>
                    measureTextInCentimeters(option, canvasContext),
                ),
            );

            let optionRows: number[][];
            let useFourOffsets = false;
            let useTwoColumns = false;

            if (longestAnswerWidth + 0.5 <= smallestAdjacentSpace) {
                optionRows = [answerOptions.map((_, index) => index)];
                useFourOffsets = true;
            } else if (longestAnswerWidth + 0.5 <= firstToThirdOffsetSpace) {
                optionRows = [
                    answerOptions
                        .map((_, index) => index)
                        .filter((index) => index < 2),
                    answerOptions
                        .map((_, index) => index)
                        .filter((index) => index >= 2),
                ];
                useTwoColumns = true;
            } else {
                optionRows = answerOptions.map((_, index) => [index]);
            }

            optionRows.forEach((optionRow) => {
                const tabStopPositions = useFourOffsets
                    ? optionRow
                          .slice(1)
                          .map((optionIndex) => optionOffsets[optionIndex])
                    : useTwoColumns && optionRow.length > 1
                      ? [optionOffsets[2]]
                      : [];

                paragraphs.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: optionRow
                                    .map(
                                        (optionIndex) =>
                                            answerOptions[optionIndex],
                                    )
                                    .join("\t"),
                                font: layoutSettings.fontFamily,
                                size: layoutSettings.fontSize * 2,
                            }),
                        ],
                        indent: {
                            left: centimetersToTwips(optionOffsets[0]),
                        },
                        tabStops: tabStopPositions.map((position) => ({
                            type: TabStopType.LEFT,
                            position: centimetersToTwips(
                                position - optionOffsets[0],
                            ),
                        })),
                        spacing: { after: 60 },
                    }),
                );
            });
        });

        return paragraphs;
    });

    return content;
};
