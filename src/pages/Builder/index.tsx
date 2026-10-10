import { ActionsPanel } from "./ActionsPanel";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { PreviewPanel } from "./PreviewPanel";

export const BuilderPage = () => {
    return (
        <div>
            <div className="flex shadow rounded-b">
                <ConfigurationPanel />
                <PreviewPanel />
            </div>
            <div>
                <ActionsPanel />
            </div>
        </div>
    );
};
