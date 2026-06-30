export interface ITypeMeta {
  colorVar: string;
  iconName: string;
}

export const getResourceMeta = (resourceType: string): ITypeMeta => {
  const normalized = (resourceType || "").trim().toLowerCase();

  if (normalized === "hot desk") {
    return { colorVar: "--color-hotdesk", iconName: "ThisPC" };
  }

  if (normalized === "parking") {
    return { colorVar: "--color-parking", iconName: "Car" };
  }

  if (normalized === "locker") {
    return { colorVar: "--color-locker", iconName: "Lock" };
  }

  if (normalized === "meeting room") {
    return { colorVar: "--color-meetingroom", iconName: "Home" };
  }

  return { colorVar: "--color-other", iconName: "Org" };
};
