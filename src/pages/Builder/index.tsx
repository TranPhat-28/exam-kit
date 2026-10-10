import { ActionsPanel } from "./ActionsPanel";
import { ConfigurationPanel } from "./ConfigurationPanel";

export const BuilderPage = () => {
    return (
        <div className="flex gap-2">
            <ConfigurationPanel />
            <ActionsPanel />
        </div>
    );
};
