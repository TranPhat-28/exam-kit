import type { ExamSection } from "../store/types";

export const exportExamInstructions = async (sections: ExamSection[]) => {
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const instructionParagraphs = sections.map(
        (section, index) =>
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${index + 1}. ${section.content.instruction}`,
                        font: "Times New Roman",
                        bold: true,
                        size: 24,
                    }),
                ],
            }),
    );
    const document = new Document({
        sections: [
            {
                children:
                    instructionParagraphs.length > 0
                        ? instructionParagraphs
                        : [new Paragraph({})],
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
