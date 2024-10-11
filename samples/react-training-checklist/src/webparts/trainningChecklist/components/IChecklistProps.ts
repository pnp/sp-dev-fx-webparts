import { spfi } from "@pnp/sp";

export interface IChecklistProps {
    userId: number;
    sp: ReturnType<typeof spfi>;
    selectedList: string;
  }
  