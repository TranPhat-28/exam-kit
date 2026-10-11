import { AddMultipleChoiceQuestionPanel } from "../../AddMultipleChoiceQuestionPanel";

interface ReadingComprehensionManagerProps {
    paragraph: string;
    onParagraphChange: (paragraph: string) => void;
}

export const ReadingComprehensionManager = ({
    paragraph,
    onParagraphChange,
}: ReadingComprehensionManagerProps) => {
    return (
        <div>
            <p className="mb-2">Nội dung đoạn văn:</p>
            <textarea
                className="p-2 w-full border rounded"
                rows={5}
                cols={50}
                placeholder="Nhập nội dung đoạn văn..."
                value={paragraph}
                onChange={(event) => onParagraphChange(event.currentTarget.value)}
            />

            <p className="mb-2">Câu hỏi:</p>
            <AddMultipleChoiceQuestionPanel />
        </div>
    );
};
