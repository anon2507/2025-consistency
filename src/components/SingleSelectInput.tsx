import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Option } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { InputContext } from "../contexts/InputContext";

type Props = {
	className?: string;
	option: Option;
};

export function SingleSelectInput({ className, option }: Props) {
	const { value, setValue, setValid } = useContext(InputContext);

	return (
		<RadioGroup
			value={value}
			onValueChange={(e) => {
				setValue(e);
				setValid(true);
			}}
			className={cn("flex flex-col lg:flex-row lg:gap-3", className)}
		>
			{option.options.map((option) => (
				<div key={option.id} className="mt-3 flex">
					<RadioGroupItem
						id={option.id ?? ""}
						value={option.id ?? ""}
						className="mr-1 cursor-pointer"
					/>
					<Label htmlFor={option.id ?? ""} className="cursor-pointer">
						{option.label}
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}
