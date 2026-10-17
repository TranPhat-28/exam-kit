import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    ExportSettingsState,
    ScramblingSettingType,
    SectionNumberingSettingType,
} from "../types/exportSettingsSlice/types";

const initialState: ExportSettingsState = {
    scramblingEnabled: false,
    scramblingSettings: undefined,
    sectionNumberingEnabled: false,
    sectionNumberingSettings: undefined,
    crossSectionNumberingEnabled: false,
};

const exportSettingsSlice = createSlice({
    name: "ExportSettings",
    initialState,
    reducers: {
        updateScramblingEnabled(state, action: PayloadAction<boolean>) {
            state.scramblingEnabled = action.payload;
        },
        updateScramblingSettings(
            state,
            action: PayloadAction<ScramblingSettingType | undefined>,
        ) {
            state.scramblingSettings = action.payload;
        },
        updateSectionNumberingEnabled(state, action: PayloadAction<boolean>) {
            state.sectionNumberingEnabled = action.payload;
        },
        updateSectionNumberingSettings(
            state,
            action: PayloadAction<SectionNumberingSettingType | undefined>,
        ) {
            state.sectionNumberingSettings = action.payload;
        },
        updateCrossSectionNumberingEnabled(
            state,
            action: PayloadAction<boolean>,
        ) {
            state.crossSectionNumberingEnabled = action.payload;
        },
    },
});

export const {
    updateScramblingEnabled,
    updateScramblingSettings,
    updateSectionNumberingEnabled,
    updateSectionNumberingSettings,
    updateCrossSectionNumberingEnabled,
} = exportSettingsSlice.actions;

export default exportSettingsSlice.reducer;