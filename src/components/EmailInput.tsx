import { useContext } from "react";

import { z } from "zod";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputContext } from "../contexts/InputContext";

type Props = {
	className?: string;
};

export function EmailInput({ className }: Props) {
	const { value, setValue, setValid, optional } = useContext(InputContext);

	return (
		<Input
			type="email"
			className={cn(className)}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onBlur={() => {
				if (optional && value.trim() === "") {
					setValid(true);
					return;
				}
				setValid(z.string().email().safeParse(value).success);
			}}
		/>
	);
}
