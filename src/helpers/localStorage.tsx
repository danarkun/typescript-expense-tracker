import { TransactionsState } from "../types/types";

export const getData = (key: any) => {
	if (!localStorage || localStorage.getItem(key) == null) return null;

	try {
		return JSON.parse(localStorage.getItem(key) as string);
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
		return null;
	}
};

export const storeData = (key: string, item: any) => {
	if (!localStorage) return;

	console.log("Saving storage");
	try {
		return localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
