import { DefaultViewKey, ViewKeys } from "model";
import { useParams } from "react-router";
import { ViewDescriptorsById } from "./Views";

export const useView = () => {
    const { view } = useParams();
    return ViewDescriptorsById.get(view as ViewKeys) || ViewDescriptorsById.get(DefaultViewKey);
}