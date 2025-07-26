export type Option = {
	createdAt: string;
	updatedAt: string;
	label: string;
	options: OptionItem[];
};

export type OptionItem = {
	label: string;
	id: string;
};
