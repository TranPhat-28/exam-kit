import type { ExamSection } from "../store/types";
import type { LayoutSettingsState } from "../store/layoutSettingsSlice";
import { SectionType } from "../types/SectionType";

const centimetersToTwips = (centimeters: number) =>
    Math.round((centimeters * 1440) / 2.54);

export const exportExamInstructions = async (
    sections: ExamSection[],
    layoutSettings: LayoutSettingsState,
) => {
    const { Document, Packer, Paragraph, TabStopType, TextRun } =
        await import("docx");
    const canvas = window.document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    if (canvasContext) {
        canvasContext.font = '12pt "Times New Roman"';
    }

    const measureTextInCentimeters = (text: string) =>
        canvasContext
            ? (canvasContext.measureText(text).width * 2.54) / 96
            : text.length * 0.22;

    const content = sections.flatMap((section, sectionIndex) => {
        const paragraphs = [
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${sectionIndex + 1}. ${section.content.instruction}`,
                        font: "Times New Roman",
                        bold: true,
                        size: 24,
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
                            font: "Times New Roman",
                            size: 24,
                        }),
                    ],
                    spacing: { after: 120 },
                }),
            );
        }

        section.content.questions.forEach((question, questionIndex) => {
            const questionText =
                "question" in question
                    ? `Câu ${questionIndex + 1}. ${question.question}`
                    : `Câu ${questionIndex + 1}.`;

            paragraphs.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: questionText,
                            font: "Times New Roman",
                            bold: true,
                            size: 24,
                        }),
                    ],
                    spacing: { before: 120, after: 60 },
                }),
            );

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
                ...answerOptions.map(measureTextInCentimeters),
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
                                font: "Times New Roman",
                                size: 24,
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

    const document = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: centimetersToTwips(layoutSettings.margins.top),
                            bottom: centimetersToTwips(
                                layoutSettings.margins.bottom,
                            ),
                            left: centimetersToTwips(
                                layoutSettings.margins.left,
                            ),
                            right: centimetersToTwips(
                                layoutSettings.margins.right,
                            ),
                        },
                    },
                },
                children: content.length > 0 ? content : [new Paragraph({})],
            },
        ],
    });
    const blob = await Packer.toBlob(document);
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = window.document.createElement("a");

    downloadLink.href = downloadUrl;
    downloadLink.download = "exam-instructions.docx";
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
};
