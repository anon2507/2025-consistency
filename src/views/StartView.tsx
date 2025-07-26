import { Button } from "@/components/ui/button";
import { type Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
	title: string;
	content: Content;
	onNext: () => void;
};

export function StartView({ title, content, onNext }: Props) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editorProps: {
			attributes: {
				class:
					"max-w-full prose prose-sm sm:prose-base lg:prose-lg font-pretendard focus:outline-none py-4 *:leading-normal",
			},
		},
		editable: false,
	});

	return (
		<div className="w-full h-full [&&]:h-dvh py-3 md:py-12 px-3 md:px-6">
			<div className="container mx-auto flex flex-col h-full">
				<div className="flex-1 overflow-y-auto">
					<h1 className="text-2xl font-bold">{title}</h1>
					<EditorContent editor={editor} />
				</div>
				<div className="shrink-0 flex border-t border-muted-foreground py-3">
					<div className="flex-1" />
					<Button onClick={onNext}>Start</Button>
				</div>
			</div>
		</div>
	);
}
