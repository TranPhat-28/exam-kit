import { ContentConfiguration } from "./ContentConfiguration";
import { HeaderConfiguration } from "./HeaderConfiguration";

export const ConfigurationPanel = () => {
    return (
        <div className="flex flex-col gap-2 p-4 flex-2 border border-base-300 rounded shadow">
            <h2 className="text-lg font-bold">Tinh chỉnh đề</h2>
            <HeaderConfiguration />
            <ContentConfiguration />
        </div>
    );
};
