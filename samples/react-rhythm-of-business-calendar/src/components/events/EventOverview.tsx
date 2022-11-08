import React, { FC } from 'react';
import { css, IStackStyles, IStackTokens, Stack, StackItem, Text } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { LockIcon, POIIcon, RecentIcon, RepeatAllIcon } from '@fluentui/react-icons-mdl2';
import { Entity } from 'common';
import { LiveUpdate } from 'common/components';
import { IEvent, humanizeDateRange, humanizeRecurrencePattern } from 'model';
import { useConfigurationService } from 'services';
import { RefinerValuePill } from '../refiners';

import { EventOverview as strings } from 'ComponentStrings';

import styles from './EventOverview.module.scss';

interface IProps {
    event: IEvent;
    className?: string;
}

export const EventOverview: FC<IProps> = ({ event, className }) => {
    const { active: { useApprovals } } = useConfigurationService();
    const { title, start, end, isAllDay, location, isSeriesMaster, isPendingApproval, isRejected, isRecurring, isConfidential, recurrence } = event;

    const titleClassName = css(
        styles.title,
        {
            [styles.unapproved]: useApprovals && isPendingApproval,
            [styles.rejected]: isRejected
        }
    );

    const rootStackTokens: IStackTokens = useConst({ childrenGap: 10 });
    const titleStackStyles: IStackStyles = useConst({ root: { width: '100%' } });
    const detailsStackTokens: IStackTokens = useConst({ childrenGap: 24 });
    const refinerValuesStackTokens: IStackTokens = useConst({ childrenGap: 6 });
    const confidentialStackTokens: IStackTokens = useConst({ childrenGap: 4 });
    const iconTextStackTokens: IStackTokens = useConst({ childrenGap: 10 });

    const refinerValues = event.refinerValues.get().filter(Entity.NotDeletedFilter);

    return (
        <LiveUpdate entity={event.getWrappedEvent()}>{renderLiveUpdateMark => <>
            <Stack className={css(styles.root, className)} tokens={rootStackTokens} horizontalAlign='start'>
                <Stack horizontal verticalAlign='start' styles={titleStackStyles}>
                    <StackItem grow>
                        <Text block className={titleClassName} data-is-focusable>{title}</Text>
                    </StackItem>
                    {renderLiveUpdateMark()}
                </Stack>
                <Stack horizontal verticalAlign='start' tokens={detailsStackTokens}>
                    {refinerValues.length > 0 &&
                        <Stack horizontal wrap verticalAlign="center" tokens={refinerValuesStackTokens}>
                            {refinerValues.map(refinerValue =>
                                <RefinerValuePill key={refinerValue.key} refinerValue={refinerValue} />
                            )}
                        </Stack>
                    }
                    {isConfidential &&
                        <Stack horizontal verticalAlign="center" tokens={confidentialStackTokens}>
                            <LockIcon />
                            <Text data-is-focusable>{strings.Confidential}</Text>
                        </Stack>
                    }
                </Stack>
                {!isSeriesMaster &&
                    <Stack horizontal verticalAlign='center' tokens={iconTextStackTokens}>
                        <Text><RecentIcon /></Text>
                        <Text data-is-focusable>{humanizeDateRange(start, end, isAllDay)}</Text>
                    </Stack>
                }
                {isRecurring &&
                    <Stack horizontal verticalAlign='center' tokens={iconTextStackTokens}>
                        <Text><RepeatAllIcon /></Text>
                        <Text data-is-focusable>{event.getSeriesMaster().start.format('LT')} - {event.getSeriesMaster().end.format('LT')}, {humanizeRecurrencePattern(start, recurrence)}</Text>
                    </Stack>
                }
                {location &&
                    <Stack horizontal verticalAlign='center' tokens={iconTextStackTokens}>
                        <Text><POIIcon /></Text>
                        <Text data-is-focusable>{location}</Text>
                    </Stack>
                }
            </Stack>
        </>}</LiveUpdate>
    );
}