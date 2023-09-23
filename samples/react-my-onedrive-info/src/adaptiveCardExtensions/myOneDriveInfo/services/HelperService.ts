import { round } from "@microsoft/sp-lodash-subset";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace HelperService {
	export const calculateSpace = (value: number): { space: number; spaceString: string; } => {
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
