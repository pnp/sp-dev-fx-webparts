define([], function() {
  return {
		FirstPageDescription: "First Page Description",
		SecondPageDescription: "Second Page Description",
		ThirdPageDescription: "Third Page Description",
		BasicGroupName: "Basic configuration",
		AdvancedGroupName: "Advanced configuration",
		DescriptionFieldLabel: "Description Field",
		ConditionalFirstGroupName: "Conditional First Group",
		ConditionalSecondGroupName: "Conditional Second Group",
		Controls: {
			AdvancedToggle: {
				Label: "Show advanced settings",
				OnText: "On",
				OffText: "Off",
			},
			ConditionalToggle: {
				Label: "Show conditional settings",
				OnText: "First group",
				OffText: "Second group",
			},
			Dropdown: {
				Label: "Dropdown",
				Options: {
					One: "First",
					Two: "Second",
					Three: "Third",
				},
			},
			CheckBox1: {
				Label: "This is a checkbox",
			},
			CheckBox2: {
				Label: "This is another checkbox",
			},
			CheckBox3: {
				Label: "This is the last checkbox",
			},
			Slider: {
				Label: "Slider",
			},
		},
	};
});