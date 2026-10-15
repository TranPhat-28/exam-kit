export type MarginSide = "top" | "bottom" | "left" | "right";
export type FontFamily = "Times New Roman" | "Open Sans";
export type FontSize = 10 | 11 | 12;

export interface LayoutSettingsState {
    fontFamily: FontFamily;
    fontSize: FontSize;
    margins: Record<MarginSide, number>;
    multipleChoiceOptionOffsets: [number, number, number, number];
}
