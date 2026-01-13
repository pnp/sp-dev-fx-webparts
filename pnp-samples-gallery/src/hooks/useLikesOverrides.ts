import { useSyncExternalStore } from "react";
import { readAllOverrides, subscribe } from "../utils/likesOverrides";

export function useLikesOverrides() {
    return useSyncExternalStore(
        (onStoreChange) => subscribe(() => onStoreChange()),
        () => readAllOverrides(),
        () => [] // SSR fallback
    );
}