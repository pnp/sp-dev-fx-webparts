declare interface IHelloConfigurationWebPartStrings {
	FirstPageDescription: string;
	SecondPageDescription: string;
	ThirdPageDescription: string;
	BasicGroupName: string;
	AdvancedGroupName: string;
	DescriptionFieldLabel: string;
	ConditionalFirstGroupName: string;
	ConditionalSecondGroupName: string;
	Controls: {
		AdvancedToggle: {
			Label: string;
			OnText: string;
			OffText: string;
		};
		ConditionalToggle: {
			Label: string;
			OnText: string;
			OffText: string;
		};
		Dropdown: {
			Label: string;
			Options: {
				One: string;
				Two: string;
				Three: string;
			};
		};
		CheckBox1: {
			Label: string;
		};
		CheckBox2: {
			Label: string;
		};
		CheckBox3: {
			Label: string;
		};
		Slider: {
			Label: string;
		};
	};
}

declare module 'HelloConfigurationWebPartStrings' {
  const strings: IHelloConfigurationWebPartStrings;
  export = strings;
}
