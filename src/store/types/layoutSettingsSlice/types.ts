export type MarginSide = "top" | "bottom" | "left" | "right";

export interface LayoutSettingsState {
    margins: Record<MarginSide, number>;
    multipleChoiceOptionOffsets: [number, number, number, number];
}
