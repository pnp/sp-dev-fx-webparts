import * as React from 'react';
import styles from '../components/PhotoSync.module.scss';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface IPersonaRenderProps {
    Title: string;
    UserID: string;
}

export interface IValueRenderProps {
    Value: string;
}

export const PersonaRender = (props: IPersonaRenderProps) => {
    const authorPersona: IPersonaSharedProps = {
        imageUrl: `/_layouts/15/userphoto.aspx?Size=S&Username=${props.UserID}`,
        text: props.Title,
        className: styles.divPersona
    };
    return (
        <div className={styles.fieldCustomizer}><Persona {...authorPersona} size={PersonaSize.size24} /></div>
    );
};

export const SyncTypeRender = (props: IValueRenderProps) => {
    switch (props.Value.toLowerCase()) {
        case 'manual':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.purplebgColor)}>
                        <span className={css(styles.spnContent, styles.purpleBox)}>{props.Value}</span>
                    </div>
                </div>
            );
        case 'bulk':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.yellowbgColor)}>
                        <span className={css(styles.spnContent, styles.yellowBox)}>{props.Value}</span>
                    </div>
                </div>
            );
    }
};

export const StatusRender = (props: IValueRenderProps) => {
    switch (props.Value.toLowerCase()) {
        case 'submitted':
        case 'updated':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.bluebgColor)}>
                        <span className={css(styles.spnContent, styles.blueBox)}>{props.Value}</span>
                    </div>
                </div>
            );
        case 'in-progress':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.orangebgColor)}>
                        <span className={css(styles.spnContent, styles.orangeBox)}>{props.Value}</span>
                    </div>
                </div>
            );
        case 'completed':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.greenbgColor)}>
                        <span className={css(styles.spnContent, styles.greenBox)}>{props.Value}</span>
                    </div>
                </div>
            );
        case 'error':
        case 'completed with error':
        case 'not updated':
            return (
                <div className={styles.fieldCustomizer}>
                    <div className={css(styles.fieldContent, styles.redbgColor)}>
                        <span className={css(styles.spnContent, styles.redBox)}>{props.Value}</span>
                    </div>
                </div>
            );
    }
};