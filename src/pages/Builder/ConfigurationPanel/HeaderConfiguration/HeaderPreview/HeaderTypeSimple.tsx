import { CONSTANTS } from "../../../../../constants/strings";
import { padDottedPlaceholderToEndOfPrefix } from "../../../../../utilities/docFormatHelpers";

export const HeaderTypeSimple = () => {
    return (
        <div className="py-4">
            <p className="flex flex-col text-xs">
                <p>
                    {padDottedPlaceholderToEndOfPrefix(
                        CONSTANTS.exam.header.prefixes.studentName,
                        true,
                    )}
                </p>
                <p>
                    {padDottedPlaceholderToEndOfPrefix(
                        CONSTANTS.exam.header.prefixes.className,
                        true,
                    )}
                </p>
            </p>
            <p className="text-base font-semibold mt-4 text-center">BÀI TẬP</p>
        </div>
    );
};
