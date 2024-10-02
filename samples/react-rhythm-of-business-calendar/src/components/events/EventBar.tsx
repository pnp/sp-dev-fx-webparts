import React, { CSSProperties, FC, useMemo } from 'react';
import { css, Stack, StackItem, useTheme } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { LockIcon, POIIcon, RecentIcon, RepeatAllIcon } from '@fluentui/react-icons-mdl2';
import { IEvent } from 'model';
import { useConfigurationService } from 'services';

import { Humanize as strings } from 'ComponentStrings';

import styles from './EventBar.module.scss';

export enum EventBarSize {
    Compact,
    Large
}

interface IProps {
    event: IEvent;
    startsIn: boolean;
    endsIn: boolean;
    timeStringOverride?: string;
    size?: EventBarSize;
    selectedTemplateKeys?: string[];

    type?: string;
}

export const EventBar: FC<IProps> = ({ event, startsIn, endsIn, timeStringOverride, size = EventBarSize.Compact, type, selectedTemplateKeys }) => {
    const { palette: { themePrimary } } = useTheme();
    const { active: { useApprovals } } = useConfigurationService();

    const { isPendingApproval, isRejected, title, start, end, isAllDay, location, tag, color, isConfidential, isRecurring } = event;

    const eventClassName = css(
        styles.event,
        {
            [styles.unapproved]: useApprovals && isPendingApproval,
            [styles.rejected]: isRejected,
            [styles.startsIn]: startsIn,
            [styles.endsIn]: endsIn,
            [styles.compact]: size === EventBarSize.Compact
        }
    );

    const style: CSSProperties = useMemo(() => {
        return {
            backgroundColor: color?.toCssString() || themePrimary
        };
    }, [color, themePrimary]);

    const startTimeString = timeStringOverride ||
        (size === EventBarSize.Compact
            ? (!isAllDay ? `${start?.format('LT')} - ${end?.format('LT')}`: strings.AllDay)
            : isAllDay ? strings.AllDay : `${start?.format('LT')} - ${end?.format('LT')}`
        );
    const showLockIcon = isConfidential;
    const showRepeatIcon = isRecurring;
    const growTitle = !isConfidential && !isRecurring;    

    return (
        <Stack className={eventClassName} style={style} tokens={useConst({ childrenGap: 2 })}>
            <Stack horizontal verticalAlign="center" title={title} tokens={useConst({ childrenGap: 6 })}>
                {selectedTemplateKeys && selectedTemplateKeys.includes('tag') && size === EventBarSize.Compact && tag && <span>[{tag}]</span>}
                {/* {((size == EventBarSize.Compact && type=== "Quarter") || (size !== EventBarSize.Compact)) && tag && <span>[{tag}]</span>} */}
                {(size !== EventBarSize.Compact) && tag && <span>[{tag}]</span>}
                <StackItem className={styles.text}>
                    {selectedTemplateKeys && selectedTemplateKeys.includes('starttime') && size === EventBarSize.Compact && startTimeString && `${startTimeString} `}
                </StackItem>
               
            </Stack>
            <Stack horizontal verticalAlign="center" title={title} tokens={useConst({ childrenGap: 4 })}>
                <StackItem grow={growTitle} className={styles.text}>
                   <span className={styles.text_overflow}> {title} </span>
                </StackItem>
                {isConfidential && (<StackItem className={styles.icon}>
                    <LockIcon />
                </StackItem>)}
                {isRecurring && (
                <StackItem className={styles.icon}>
                    <RepeatAllIcon />
                </StackItem>)}
            </Stack>
            <Stack horizontal verticalAlign="center" title={title} tokens={useConst({ childrenGap: 4 })}>
                <StackItem className={styles.text}>
                        {selectedTemplateKeys && selectedTemplateKeys.includes('location') && size === EventBarSize.Compact &&
                        <> <POIIcon />
                        <span className={styles.text}>{location || '-'}</span>
                        </> }
                </StackItem>
            </Stack>
            {size === EventBarSize.Large && <>
                <Stack horizontal verticalAlign='center' tokens={useConst({ childrenGap: 4 })}>
                    <RecentIcon />
                    <span className={styles.text}>{startTimeString}</span>
                </Stack>
                <Stack horizontal verticalAlign='center' tokens={useConst({ childrenGap: 4 })}>
                    <POIIcon />
                    <span className={styles.text}>{location || '-'}</span>
                </Stack>
            </>}
        </Stack>
    );
}