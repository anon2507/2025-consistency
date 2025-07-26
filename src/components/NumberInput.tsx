import { useContext } from "react";

import { NumberInput as BaseNumberInput } from "@/components/BaseNumberInput";
import { cn } from "@/lib/utils";
import { InputContext } from "../contexts/InputContext";

type Props = {
	className?: string;
};

export function NumberInput({ className }: Props) {
	const { value, setValue, setValid } = useContext(InputContext);

	return (
		<BaseNumberInput
			className={cn(className)}
			value={Number(value)}
			onChange={(e) => {
				setValue(e.toString());
				setValid(true);
			}}
		/>
	);
}
