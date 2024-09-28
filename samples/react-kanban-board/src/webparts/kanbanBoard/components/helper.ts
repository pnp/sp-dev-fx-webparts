import { IKanbanBucket } from "../../../kanban";

export function mergeBucketsWithChoices(inB: IKanbanBucket[], choices: string[]): IKanbanBucket[] {
    const currentbuckets: IKanbanBucket[] = [];
    if (inB &&
        inB.length > 0 &&
        choices && choices.length > 0) {
        inB.forEach((b) => {
            if (choices.filter((c) => c === b.bucket).length === 1) {
                currentbuckets.push(b);
            }
        });
        return currentbuckets;

    } else if (choices && choices.length) {
        //Adding with default values
        choices.forEach((x) => {
            currentbuckets.push({
                bucket: x,
                bucketheadline: x,
                percentageComplete: 0
            });
        });
        return currentbuckets;
    } else {

        return []
    }
}