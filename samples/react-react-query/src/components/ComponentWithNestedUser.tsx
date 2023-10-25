import * as React from "react";
import { User } from "./User";

export function ComponentWithNestedUser(): React.ReactElement {
    return <div>
        <div><User /></div>
    </div>
}