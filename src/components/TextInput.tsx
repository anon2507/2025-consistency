import { useContext } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputContext } from "../contexts/InputContext";

type Props = {
	className?: string;
};

export function TextInput({ className }: Props) {
	const { value, setValue, setValid, optional } = useContext(InputContext);

	return (
		<Input
			type="text"
			className={cn(className)}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onBlur={() => setValid(optional || value.length > 0)}
		/>
	);
}
