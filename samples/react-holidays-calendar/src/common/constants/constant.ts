export const ListName = {
	Holidays: "Holidays",
};

export const HolidaysListColumns = {
	Id: "Id",
	Title: "Title",
	Date: "Date",
	Location: "Location",
	Optional: "Optional",
};

export const HolidaysListSelectColumns = [
	HolidaysListColumns.Id,
	HolidaysListColumns.Title,
	HolidaysListColumns.Date,
	HolidaysListColumns.Location,
	HolidaysListColumns.Optional,
].join(",");
