import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Option } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { InputContext } from "../contexts/InputContext";

type Props = {
	className?: string;
	option: Option;
};

export function MultipleSelectInput({ className, option }: Props) {
	const { value, setValue, setValid, optional } = useContext(InputContext);

	if (!option) {
		return (
			<p className="text-red-600">
				Form 데이터가 잘못 구성되어 있습니다. 관리자에게 연락해 주세요
			</p>
		);
	}

	return (
		<div className={cn("flex flex-col lg:flex-row lg:gap-3", className)}>
			{option?.options.map((option) => (
				<div key={option.id} className="mt-3 flex">
					<Checkbox
						id={option.id ?? ""}
						className="mr-1 cursor-pointer"
						checked={value.split(",").includes(option.id ?? "")}
						onCheckedChange={(checked) => {
							const currentValue = value.split(",");
							if (checked) {
								setValue([...currentValue, option.id ?? ""].join(","));
								setValid(true);
							} else {
								const newValue = currentValue.filter((v) => v !== option.id);
								setValue(newValue.join(","));
								setValid(optional || newValue.length > 0);
							}
						}}
					/>
					<Label htmlFor={option.id ?? ""} className="cursor-pointer">
						{option.label}
					</Label>
				</div>
			))}
		</div>
	);
}
