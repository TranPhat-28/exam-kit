import type { LayoutSettingsState } from "../types/layoutSettingsSlice/types";

const initialState: LayoutSettingsState = {
    margins: {
        top: 2.54,
        bottom: 2.54,
        left: 2.54,
        right: 2.54,
    },
    multipleChoiceOptionOffsets: [0.5, 4.5, 8.5, 12.5],
};

const layoutSettingsReducer = (
    state: LayoutSettingsState = initialState,
): LayoutSettingsState => state;

export default layoutSettingsReducer;
