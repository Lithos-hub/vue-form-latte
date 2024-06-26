import type { SelectHTMLAttributes } from 'vue';

export interface BaseSelectItem {
	value: string | number;
	label: string;
}

export interface BaseSelectProps extends /* @vue-ignore */ SelectHTMLAttributes {
	selectData: BaseSelectItem[] | [];
	name: string;
	initialValue: string | number;
	placeholder?: string;
	label?: string;
	readonly?: boolean;
	customStyles?: string;
}
