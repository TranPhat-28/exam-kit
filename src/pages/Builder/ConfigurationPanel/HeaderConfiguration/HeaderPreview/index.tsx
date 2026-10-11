import type { HeaderType } from "../../../../../types/HeaderType";
import { HeaderTypeFormal } from "./HeaderTypeFormal";
import { HeaderTypeSimple } from "./HeaderTypeSimple";

export const HeaderPreview = ({
    selectedHeaderType,
}: {
    selectedHeaderType: HeaderType;
}) => {
    return (
        <div className="mt-4 border-t border-base-300 pt-4">
            <h4 className="mb-2 text-sm font-semibold">Xem trước</h4>
            <div className="mx-auto max-w-2xl border border-base-300 bg-base-100 p-5 text-sm shadow-sm">
                {selectedHeaderType === "official" ? (
                    <HeaderTypeFormal />
                ) : selectedHeaderType === "simple" ? (
                    <HeaderTypeSimple />
                ) : null}
            </div>
        </div>
    );
};
