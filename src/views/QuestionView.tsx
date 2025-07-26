import { EmailInput } from "@/components/EmailInput";
import { MultipleSelectInput } from "@/components/MultipleSelectInput";
import { NumberInput } from "@/components/NumberInput";
import { SingleSelectInput } from "@/components/SingleSelectInput";
import { TelephoneInput } from "@/components/TelephoneInput";
import { TextareaInput } from "@/components/TextareaInput";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { InputContext } from "@/contexts/InputContext";
import type { Option } from "@/lib/types";
import { type Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

type Props = {
	sectionTitle: string;
	sectionDescription: Content;
	questionType: string;
	questionContent: string;
	questionOptions: Option;
	questionOptional: boolean;
	onNext: () => void;
};

export function QuestionView({
	sectionTitle,
	sectionDescription,
	questionType,
	questionContent,
	questionOptions,
	questionOptional,
	onNext,
}: Props) {
	const [valid, setValid] = useState(false);
	const [value, setValue] = useState<string>("");
	const [optional, setOptional] = useState(false);

	const editor = useEditor(
		{
			extensions: [StarterKit],
			content: sectionDescription,
			editorProps: {
				attributes: {
					class:
						"max-w-full prose prose-sm sm:prose-base lg:prose-lg font-pretendard focus:outline-none py-4 *:leading-normal",
				},
			},
			editable: false,
		},
		[sectionDescription],
	);

	useEffect(() => {
		setOptional(questionOptional);
	}, [questionOptional]);

	return (
		<InputContext.Provider value={{ value, setValue, setValid, optional }}>
			<div className="w-full h-full [&&]:h-dvh py-3 md:py-12 px-3 md:px-6">
				<div className="container mx-auto flex flex-col h-full">
					<div className="flex-1 overflow-y-auto">
						<h1 className="text-2xl font-bold">{sectionTitle}</h1>
						<EditorContent editor={editor} />
						<div className="mt-6">
							<h2 className="text-lg font-bold">{questionContent}</h2>
							{(() => {
								switch (questionType) {
									case "text":
										return <TextInput className="mt-3" />;
									case "number":
										return <NumberInput className="mt-3" />;
									case "email":
										return <EmailInput className="mt-3" />;
									case "tel":
										return <TelephoneInput className="mt-3" />;
									case "textarea":
										return <TextareaInput className="mt-3" />;
									case "single_choice":
										return (
											<SingleSelectInput
												className="mt-3"
												option={questionOptions}
											/>
										);
									case "multiple_choice":
										return (
											<MultipleSelectInput
												className="mt-3"
												option={questionOptions}
											/>
										);
									default:
										return null;
								}
							})()}
						</div>
					</div>
					<div className="shrink-0 flex border-t border-muted-foreground py-3">
						<div className="flex-1" />
						<Button
							onClick={() => {
								onNext();
								setValue("");
								setValid(false);
							}}
							disabled={!valid}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</InputContext.Provider>
	);
}
