import React from 'react';
import { DefaultButton, DialogFooter, format, IChoiceGroupOption, PrimaryButton, Stack } from '@fluentui/react';
import { ErrorHandler, now } from 'common';
import { EntityDialogBase, IEntityDialogProps, IDataDialogBaseState, IDataDialogBase, LiveChoiceGroup, LiveTextField } from "common/components";
import { Event, EventModerationStatus } from "model";
import { withServices, ServicesProp, EventsServiceProp, EventsService, DirectoryServiceProp, DirectoryService } from 'services';

import { PersistConcurrencyFailureMessage, ApprovalDialog as strings } from "ComponentStrings";

const moderationOptions: IChoiceGroupOption[] = [
    { key: EventModerationStatus.Approved.name, text: strings.ModerationStatus.Approve },
    { key: EventModerationStatus.Rejected.name, text: strings.ModerationStatus.Reject }
];

export interface IApprovalDialog extends IDataDialogBase<Event> {
}

type IProps = IEntityDialogProps<Event> & ServicesProp<DirectoryServiceProp & EventsServiceProp>;
type IState = IDataDialogBaseState<Event>;

class ApprovalDialog extends EntityDialogBase<Event, IProps, IState> implements IApprovalDialog {
    protected get title() {
        return this.entity ? format(strings.Title, this.entity.displayName) : '';
    }

    protected async persistChangesCore() {
        const {
            [DirectoryService]: { currentUser },
            [EventsService]: events
        } = this.props.services;

        try {
            this.entity.moderator = currentUser;
            this.entity.moderationTimestamp = now();

            await events.persist();
        } catch (e) {
            if (ErrorHandler.is_412_PRECONDITION_FAILED(e)) {
                const message = await ErrorHandler.message(e);
                console.warn(message, e);
                return Promise.reject(PersistConcurrencyFailureMessage);
            } else {
                throw e;
            }
        }
    }

    protected renderEditContent(): JSX.Element {
        const { showValidationFeedback } = this.state;
        const event = this.entity;
        const liveProps = {
            entity: event,
            showValidationFeedback,
            updateField: this.updateField
        };

        return (
            <Stack tokens={{ childrenGap: 10 }}>
                <LiveChoiceGroup
                    {...liveProps}
                    propertyName="moderationStatus"
                    label={strings.Field_ModerationStatus.Label}
                    required
                    options={moderationOptions}
                    getKeyFromValue={val => val.name}
                    getValueFromKey={val => EventModerationStatus.fromName(val)}
                    getTextFromValue={val => {
                        switch (val) {
                            case EventModerationStatus.Approved: return strings.ModerationStatus.Approved;
                            case EventModerationStatus.Rejected: return strings.ModerationStatus.Rejected;
                            default: return strings.ModerationStatus.Pending;
                        }
                    }}
                />
                <LiveTextField
                    {...liveProps}
                    propertyName="moderationMessage"
                    label={strings.Field_ModerationComments.Label}
                    multiline
                    rows={2}
                />
            </Stack>
        );
    }

    protected renderEditFooter(): JSX.Element {
        const { submitting } = this.state;
        const onSubmit = () => this.submit(() => this.dismiss());
        const onCancel = () => this.discard();

        return (
            <DialogFooter>
                <PrimaryButton onClick={onSubmit} disabled={submitting}>{strings.Command_Submit.Text}</PrimaryButton>
                <DefaultButton onClick={onCancel}>{strings.Command_Cancel.Text}</DefaultButton>
            </DialogFooter>
        );
    }
}

export default withServices(ApprovalDialog);