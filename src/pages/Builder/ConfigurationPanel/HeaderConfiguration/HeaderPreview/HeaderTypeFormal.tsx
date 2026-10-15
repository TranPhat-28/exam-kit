import { CONSTANTS } from "../../../../../constants/strings";
import { padDottedPlaceholderToEndOfPrefix } from "../../../../../utilities/docFormatHelpers";

export const HeaderTypeFormal = () => {
    return (
        <>
            <div className="grid grid-cols-3 text-center text-xs">
                <div className="col-span-1 border border-r-0 p-2">
                    <p className="font-bold">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.educationAuthority,
                        )}
                    </p>
                    <p className="font-semibold mb-4">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.school,
                        )}
                    </p>
                    <p className="font-bold border w-fit p-2 mx-auto">
                        {CONSTANTS.exam.header.fixedValues.official}
                    </p>
                </div>

                <div className="col-span-2 border p-2">
                    <p className="font-semibold">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.examTitle,
                        )}
                    </p>
                    <p className="font-semibold">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.academicYear,
                            true,
                        )}
                    </p>
                    <p className="mb-4">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.subject,
                            true,
                        )}
                    </p>

                    <p className="text-xs italic">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.duration,
                            true,
                        )}
                    </p>
                    <p className="text-xs italic">
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.durationNote,
                        )}
                    </p>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-4">
                <div className="col-start-4 w-fit border p-2 font-semibold">
                    <p>
                        {padDottedPlaceholderToEndOfPrefix(
                            CONSTANTS.exam.header.prefixes.examCode,
                        )}
                    </p>
                </div>
            </div>

            <div className="flex flex-col text-xs">
                <p>
                    {padDottedPlaceholderToEndOfPrefix(
                        CONSTANTS.exam.header.prefixes.studentName,
                        true,
                    )}
                </p>
                <p>
                    {padDottedPlaceholderToEndOfPrefix(
                        CONSTANTS.exam.header.prefixes.studentNumber,
                        true,
                    )}
                </p>
                <p>
                    {padDottedPlaceholderToEndOfPrefix(
                        CONSTANTS.exam.header.prefixes.className,
                        true,
                    )}
                </p>
            </div>
        </>
    );
};
