export type ScramblingSettingType = {
    numberOfScrambleRequired: number;
    scrambleSectionsEnabled: boolean;
    scrambleQuestionsEnabled: boolean;
    scrambleAnswersEnabled: boolean;
};

export type SectionNumberingSettingType = {
    numberType: "cardinal" | "roman" | "letter";
};

export interface ExportSettingsState {
    scramblingEnabled: boolean;
    scramblingSettings: ScramblingSettingType | undefined;
    sectionNumberingEnabled: boolean;
    sectionNumberingSettings: SectionNumberingSettingType | undefined;
    crossSectionNumberingEnabled: boolean;
}