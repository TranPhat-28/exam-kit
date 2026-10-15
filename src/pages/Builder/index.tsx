import { ActionsPanel } from "./ActionsPanel";
import { ConfigurationPanel } from "./ConfigurationPanel";

export const BuilderPage = () => {
    return (
        <div className="flex gap-2 py-6">
            <ConfigurationPanel />
            <ActionsPanel />
        </div>
    );
};
