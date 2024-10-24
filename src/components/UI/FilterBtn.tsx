import React, { memo } from "react";

interface FilterBtnProps {
	handler: () => void;
	text: string;
	className?: string;
}
export const FilterBtn: React.FC<FilterBtnProps> = memo(
	({ handler, text, className }) => {
		return (
			<button className={`filter-btn ${className}`} onClick={handler}>
				{text}
			</button>
		);
	}
);
