import { BaseComponent, BaseComponentContext } from "@microsoft/sp-component-base";
import { IMicrosoftTeams } from "@microsoft/sp-webpart-base";

export type SpfxComponent = BaseComponent;
export type SpfxContext = BaseComponentContext;

export const SpfxComponent: unique symbol = Symbol("SpfxComponent");
export const SpfxContext: unique symbol = Symbol("SpfxContext");
export const TeamsJs: unique symbol = Symbol("TeamsJs");
export const Properties: unique symbol = Symbol("Properties");

export type SpfxProp = {
    [SpfxComponent]: SpfxComponent;
    [SpfxContext]: SpfxContext;
    [TeamsJs]: IMicrosoftTeams;
    [Properties]: any;
};