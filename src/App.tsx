import data from "@/assets/data.json";
import { useCallback, useMemo, useState } from "react";
import { FinishView } from "./views/FinishView";
import { QuestionView } from "./views/QuestionView";
import { StartView } from "./views/StartView";

const FORM_FINISHED = Symbol("FORM_FINISHED");

export default function App() {
	const [sectionIndex, setSectionIndex] = useState(-1);
	const [questionIndex, setQuestionIndex] = useState(-1);

	const question = useMemo(() => {
		if (sectionIndex === -1 || questionIndex === -1) {
			return null;
		}

		if (sectionIndex === -2) {
			return FORM_FINISHED;
		}

		return data.sections[sectionIndex].questions[questionIndex];
	}, [sectionIndex, questionIndex]);

	const onNext = useCallback(() => {
		if (
			sectionIndex === data.sections.length - 1 &&
			questionIndex === data.sections[sectionIndex].questions.length - 1
		) {
			setSectionIndex(-2);
			setQuestionIndex(-2);
			return;
		}

		if (questionIndex === data.sections[sectionIndex].questions.length - 1) {
			setSectionIndex(sectionIndex + 1);
			setQuestionIndex(0);
			return;
		}

		setQuestionIndex(questionIndex + 1);
	}, [sectionIndex, questionIndex]);

	if (question === FORM_FINISHED) {
		return <FinishView />;
	}

	if (!question) {
		return (
			<StartView
				title={data.name}
				content={data.description[0]}
				onNext={() => {
					setSectionIndex(0);
					setQuestionIndex(0);
				}}
			/>
		);
	}

	return (
		<QuestionView
			sectionTitle={data.sections[sectionIndex].title}
			sectionDescription={data.sections[sectionIndex].description[0]}
			questionType={question.type}
			questionContent={question.question}
			questionOptions={question.options}
			questionOptional={false}
			onNext={onNext}
		/>
	);
}
