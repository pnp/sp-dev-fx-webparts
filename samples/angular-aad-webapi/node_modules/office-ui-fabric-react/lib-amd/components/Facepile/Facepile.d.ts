import * as React from 'react';
import { IFacepileProps } from './Facepile.Props';
import './Facepile.scss';
export declare class Facepile extends React.Component<IFacepileProps, {}> {
    static defaultProps: IFacepileProps;
    render(): JSX.Element;
    private _getPersonaControl(persona);
    private _getElementWithOnClickEvent(personaControl, persona, index);
    private _getElementWithoutOnClickEvent(personaControl, persona, index);
    private _getOverflowElement(numPersonasToShow);
    private _getDescriptiveOverflowElement(numPersonasToShow);
    private _getIconElement(icon);
    private _getAddNewElement();
    private _onPersonaClick(persona, ev?);
    private _onPersonaMouseMove(persona, ev?);
    private _onPersonaMouseOut(persona, ev?);
}
