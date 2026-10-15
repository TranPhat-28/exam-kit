import type {
    ExamSection,
    HeaderTextSettings,
} from "../store/types/examContentSlice/types";
import type { LayoutSettingsState } from "../store/types/layoutSettingsSlice/types";
import type { HeaderType } from "../types/HeaderType";
import { generateContent, generateHeader } from "./contentGenerator";
import { centimetersToTwips } from "./docFormatHelpers";

// Arguments values are stored in redux store, and passed to this function
// when the user clicks the "Export" button in the ActionsPanel component.
export const exportExamInstructions = async (
    sections: ExamSection[],
    layoutSettings: LayoutSettingsState,
    headerType: HeaderType,
    headerText: HeaderTextSettings,
) => {
    const docx = await import("docx");
    const { Document, Packer } = docx;
    const canvas = window.document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");

    if (canvasContext) {
        canvasContext.font = `${layoutSettings.fontSize}pt "${layoutSettings.fontFamily}"`;
    }

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
                children: [
                    ...generateHeader(
                        docx,
                        headerType,
                        layoutSettings,
                        headerText,
                    ),
                    ...generateContent(
                        docx,
                        sections,
                        layoutSettings,
                        canvasContext,
                    ),
                ],
            },
        ],
    });

    // Generate the DOCX file and create a download link
    const blob = await Packer.toBlob(document);
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = window.document.createElement("a");

    // Trigger the download
    downloadLink.href = downloadUrl;
    downloadLink.download = "exam-generated.docx";
    downloadLink.click();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
};
