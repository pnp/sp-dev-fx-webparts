import { isEmpty } from "lodash";
import React, { FC } from "react";
import { css, Label, Persona, PersonaSize } from "@fluentui/react";
import { User } from "../User";

import styles from "./styles/UserList.module.scss";

interface IProps {
    users: User[];
    className?: string;
    label?: string;
    size?: PersonaSize;
}

const renderUser = (user: User, size: PersonaSize = PersonaSize.size24) =>
    <Persona
        tabIndex={0}
        aria-label={user.title}
        className={styles.persona}
        text={user.title}
        imageUrl={user.picture}
        size={size}
    />;

export const UserList: FC<IProps> = ({
    className,
    label,
    users,
    size
}: IProps) => <>
        {label && <Label tabIndex={0} aria-label={label}>{label}</Label>}
        <div className={css(styles.personaList, className)}>
            {isEmpty(users)
                ? <>&nbsp;</>
                : users.sort(User.TitleAscComparer).map(user => renderUser(user, size))
            }
        </div>
    </>;