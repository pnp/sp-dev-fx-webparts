import { isEmpty } from "lodash";
import React, { FC, useCallback, useMemo } from "react";
import { PrincipalType } from "@pnp/sp";
import { IPeoplePickerProps, ListPeoplePicker, NormalPeoplePicker, CompactPeoplePicker, IPersonaProps, Label, css, useTheme, PeoplePickerItem, IPeoplePickerItemSelectedProps, IPeoplePickerItemSelectedStyles } from '@fluentui/react';
import { IDirectoryService, useDirectoryService } from 'common/services';
import { SharePointGroup } from "common/sharepoint";
import { User } from '../User';
import { InfoTooltip } from "./InfoTooltip";

import * as cstrings from 'CommonStrings';
import styles from './styles/UserPicker.module.scss';

const maximumSuggestions = 10;

export enum UserPickerDisplayOption {
    Normal,
    List,
    Compact
}

export type OnChangedCallback = (users: User[]) => void;

export interface IUserPickerProps {
    className?: string;
    label?: string;
    ariaLabel?: string;
    tooltip?: string;
    disabled?: boolean;
    required?: boolean;
    display?: UserPickerDisplayOption;
    users: User[];
    onChanged: OnChangedCallback;
    restrictPrincipalType?: PrincipalType;
    restrictToGroupMembers?: SharePointGroup;
}

interface IUserPersonaProps extends IPersonaProps {
    user: User;
}

const userToUserPersona = (user: User): IUserPersonaProps => {
    return {
        imageUrl: user.picture,
        text: user.title,
        secondaryText: user.email,
        user: user
    };
};

const containsUser = (list: User[], user: User) => {
    return list.some(item => item.email === user.email);
};

const removeDuplicateUsers = (suggestedUsers: User[], currentUsers: User[]) => {
    return suggestedUsers.filter(user => !containsUser(currentUsers, user));
};

const extractEmailAddress = (input: string): string => {
    const emailAddress = /<.+?>/g.exec(input);

    if (emailAddress && emailAddress[0]) {
        return emailAddress[0].substring(1, emailAddress[0].length - 1).trim();
    } else {
        return input.trim();
    }
};
const extractEmailAddresses = (input: string): string[] => {
    return input.split(';').map(extractEmailAddress).filter(Boolean).map(e => e.toLocaleLowerCase());
};

const isListOfEmailAddresses = (input: string): boolean => {
    return input.indexOf(';') !== -1 && input.length > 10;
};

const resolveSuggestions = async (searchText: string, currentUserPersonas: IUserPersonaProps[], directoryService: IDirectoryService, onChangedFn: OnChangedCallback, restrictToGroupMembers?: SharePointGroup, restrictPrincipalType?: PrincipalType): Promise<IUserPersonaProps[]> => {
    if (!searchText) return [];
    searchText = searchText.toLocaleLowerCase();

    const currentUsers = currentUserPersonas.map(userPersona => userPersona.user);

    if (isListOfEmailAddresses(searchText)) {
        const extractedEmails = extractEmailAddresses(searchText);
        let resolvedUsers: User[];

        if (restrictToGroupMembers)
            resolvedUsers = restrictToGroupMembers.members.filter(member => extractedEmails.some(email => member.email === email));
        else
            resolvedUsers = await directoryService.resolve(extractedEmails);

        const nextUsers = [
            ...currentUsers,
            ...removeDuplicateUsers(resolvedUsers, currentUsers)
        ];

        onChangedFn(nextUsers);

        return [];
    }
    else {
        let suggestedUsers: User[];

        if (restrictToGroupMembers)
            suggestedUsers = restrictToGroupMembers.members.filter(member => member.title?.toLocaleLowerCase().includes(searchText) || member.email?.toLocaleLowerCase().includes(searchText));
        else
            suggestedUsers = await directoryService.search(searchText, restrictPrincipalType);

        suggestedUsers = suggestedUsers.slice(0, maximumSuggestions);

        return removeDuplicateUsers(suggestedUsers, currentUsers).map(userToUserPersona);
    }
};

const UserPicker: FC<IUserPickerProps> = ({
    className,
    display = UserPickerDisplayOption.Normal,
    disabled,
    label,
    ariaLabel,
    required,
    tooltip,
    users,
    onChanged,
    restrictToGroupMembers,
    restrictPrincipalType
}) => {
    const { palette: { neutralLight } } = useTheme();
    const directory = useDirectoryService();
    const userPersonas = users.map(userToUserPersona);
    const role = !isEmpty(userPersonas) ? "list" : "none";

    const onChange = (items: IPersonaProps[]) => {
        if (!disabled)
            onChanged((items as IUserPersonaProps[]).map(userPersona => userPersona.user));
    };

    const onResolveSuggestions = (filter: string, selectedItems: IPersonaProps[]) =>
        resolveSuggestions(filter, selectedItems as IUserPersonaProps[], directory, onChanged, restrictToGroupMembers, restrictPrincipalType);

    const fixHighContrastPeoplePickerItemStyles = useMemo(() => {
        return { root: { backgroundColor: neutralLight } } as IPeoplePickerItemSelectedStyles;
    }, [neutralLight]);

    const onRenderItem = useCallback(
        (props: IPeoplePickerItemSelectedProps) => <PeoplePickerItem {...props} styles={fixHighContrastPeoplePickerItemStyles} />,
        [fixHighContrastPeoplePickerItemStyles]
    );

    const renderPicker = () => {
        const peoplePickerProps: IPeoplePickerProps = {
            selectedItems: userPersonas,
            onResolveSuggestions,
            onChange,
            disabled,
            inputProps: { 'aria-label': ariaLabel || label },
            removeButtonAriaLabel: cstrings.UserPicker.RemoveAriaLabel,
            onRenderItem
        };

        switch (display) {
            case UserPickerDisplayOption.Normal:
                return <NormalPeoplePicker {...peoplePickerProps} />;
            case UserPickerDisplayOption.List:
                return <ListPeoplePicker {...peoplePickerProps} />;
            case UserPickerDisplayOption.Compact:
                return <CompactPeoplePicker {...peoplePickerProps} />;
        }
    };

    return (
        <div className={css(styles.userPicker, className)} aria-label={ariaLabel || label} role={role}>
            {label &&
                <InfoTooltip text={tooltip}>
                    <Label className={styles.label} required={required}>{label}</Label>
                </InfoTooltip>
            }
            {renderPicker()}
        </div>
    );
};

export default UserPicker;