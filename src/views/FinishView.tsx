"use client";

import { Check } from "lucide-react";

export function FinishView() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Check className="w-12 h-12 text-muted-foreground" />
			<p className="text-muted-foreground mt-3">
				The form has been completed. Thank you.
			</p>
		</div>
	);
}
