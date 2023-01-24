import { round } from "@microsoft/sp-lodash-subset";

export namespace HelperService {
	export const calculateSpace = (value: number) => {
		let space = 0;
		let spaceString = "";
		if (value) {
			if (value / Math.pow(1024, 2) < 1024) {
				space = round(value / Math.pow(1024, 2), 2);
				spaceString = `${space} MB`;
			} else {
				space = round(value / Math.pow(1024, 3), 2);
				spaceString = `${space} GB`;
			}
		}
		return {
			space: space,
			spaceString: spaceString,
		};
	};
}
