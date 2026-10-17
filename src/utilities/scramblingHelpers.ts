export const getMaximumScrambleVersions = (numberOfSections: number) => {
    let maximumVersions = 1;

    for (let factor = 2; factor <= numberOfSections; factor += 1) {
        maximumVersions *= factor;
    }

    return maximumVersions;
};
