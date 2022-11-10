import { noop } from "lodash";
import React, { Component, ReactElement, ReactNode } from "react";
import { css, DefaultButton, PrimaryButton, IconButton, MessageBar, MessageBarType, Spinner, SpinnerSize, Stack, StackItem } from "@fluentui/react";
import { CircleRingIcon, CompletedSolidIcon, RadioBtnOnIcon } from "@fluentui/react-icons-mdl2";
import { IWizardStrings } from "../Localization";

import * as cstrings from "CommonStrings";
import styles from "./styles/Wizard.module.scss";

export type WizardData = {};

export interface IButtonRenderProps<D extends WizardData> {
    defaultBackButton: ReactNode;
    defaultNextButton: ReactNode;
    disabled: boolean;
    isFowardOnly: boolean;
    isFirstStep: boolean;
    isLastStep: boolean;
    wizardStrings: IWizardStrings;
    data: D;
    onBack: () => void;
    onNext: () => void;
}

export interface IWizardPageMetadata<D extends WizardData> {
    title?: string;
    forwardOnly?: boolean;
    onRenderButtons?: (props: IButtonRenderProps<D>) => ReactNode;
}

export interface IWizardPageProps<D extends WizardData> {
    data: D;
    onClickEdit?: (pageIndex: number) => void;
    children?: React.ReactNode;
}

export interface IWizardStepProps<D extends WizardData> extends IWizardPageProps<D> {
    stepNumber?: number;
    totalStepCount?: number;
    validateFn: (fn: () => boolean) => void;
    deactivateFn: (fn: () => Promise<any>) => void;
}

export type PageRenderer<D extends WizardData, P extends IWizardPageProps<D> = IWizardPageProps<D>> = React.FC<P>;
export type StepRenderer<D extends WizardData, P extends IWizardStepProps<D> = IWizardStepProps<D>> = PageRenderer<D, P> & IWizardPageMetadata<D>;

export interface IWizardProps<D extends WizardData> {
    data: D;
    headingLabel?: string;
    heading?: ReactElement;
    className?: string;
    panel?: boolean;
    strings?: Partial<IWizardStrings>;
    startPage?: PageRenderer<D>;
    stepPages: StepRenderer<D>[];
    successPage?: PageRenderer<D>;
    successPageTimeout?: number;
    execute?: (config: D) => Promise<void>;
    initialize?: () => Promise<void>;
    onWizardComplete?: () => void;
    onDiscard?: () => void;
}

export interface IWizardState {
    currentPageIndex: number;
    error: any;
}

abstract class WizardPage<D extends WizardData, P extends IWizardPageProps<D> = IWizardPageProps<D>> {
    constructor(
        private readonly _renderer: PageRenderer<D, P>,
        protected readonly wizardStrings: IWizardStrings
    ) {
    }

    public async activate(): Promise<void> {
    }

    public valid(): boolean {
        return true;
    }

    public async deactivate(): Promise<void> {
    }

    public get autoContinue(): boolean {
        return false;
    }

    public renderPage(props: P): React.ReactNode {
        const Page = this._renderer;
        return <Page {...props} />;
    }

    public renderFooterButtons(props: IWizardPageProps<D>, disabled: boolean): ReactNode {
        return <></>;
    }
}

class WizardStartPage<D extends WizardData> extends WizardPage<D> {
    constructor(
        renderer: PageRenderer<D>,
        wizardStrings: IWizardStrings,
        private readonly _onClickStart: () => void
    ) {
        super(renderer, wizardStrings);
    }

    public renderFooterButtons(props: IWizardPageProps<D>, disabled: boolean): ReactNode {
        return <>
            <PrimaryButton text={this.wizardStrings.StartButton.Text} disabled={disabled} onClick={this._onClickStart} />
        </>;
    }
}

class WizardStepPage<D extends WizardData> extends WizardPage<D, IWizardStepProps<D>> {
    private _validateFn: () => boolean;
    private _deactivateFn: () => Promise<any>;

    constructor(
        public readonly renderer: StepRenderer<D>,
        wizardStrings: IWizardStrings,
        private readonly _stepNumber: number,
        private readonly _totalStepCount: number,
        private readonly _onClickBack: () => void,
        private readonly _onClickNext: () => void
    ) {
        super(renderer, wizardStrings);
    }

    public valid(): boolean {
        return this._validateFn ? this._validateFn() : true;
    }

    public async deactivate(): Promise<void> {
        if (this._deactivateFn)
            await this._deactivateFn();
    }

    protected get isStep(): boolean {
        return !!this._stepNumber;
    }

    protected get isFirstStep(): boolean {
        return this._stepNumber === 1;
    }

    protected get isLastStep(): boolean {
        return this._stepNumber === this._totalStepCount;
    }

    public renderPage(props: IWizardStepProps<D>): React.ReactNode {
        if (this.isStep) {
            props.stepNumber = this._stepNumber;
            props.totalStepCount = this._totalStepCount;
        }

        return super.renderPage({
            ...props,
            validateFn: fn => this._validateFn = fn,
            deactivateFn: fn => this._deactivateFn = fn
        });
    }

    public renderFooterButtons(props: IWizardPageProps<D>, disabled: boolean): ReactNode {
        const { BackButton, NextButton, FinishButton } = this.wizardStrings;
        const backButtonText = BackButton.Text;
        const nextButtonText = this.isLastStep ? FinishButton.Text : NextButton.Text;
        const isFowardOnly = !!this.renderer.forwardOnly;

        let defaultBackButton: ReactNode;
        let defaultNextButton: ReactNode;

        if (this.isFirstStep || isFowardOnly) {
            defaultBackButton = <></>;
            defaultNextButton = <PrimaryButton text={nextButtonText} disabled={disabled} onClick={this._onClickNext} />;
        } else {
            defaultBackButton = <DefaultButton text={backButtonText} disabled={this.isFirstStep || disabled} onClick={this._onClickBack} />;
            defaultNextButton = <PrimaryButton text={nextButtonText} disabled={disabled} onClick={this._onClickNext} />;
        }

        const renderProps: IButtonRenderProps<D> = {
            data: props.data,
            defaultBackButton,
            defaultNextButton,
            disabled,
            isFowardOnly,
            isFirstStep: this.isFirstStep,
            isLastStep: this.isLastStep,
            wizardStrings: this.wizardStrings,
            onBack: this._onClickBack,
            onNext: this._onClickNext
        };

        const { onRenderButtons } = this.renderer;
        return onRenderButtons ? onRenderButtons(renderProps) : this._defaultRenderFooterButtons(renderProps);
    }

    private _defaultRenderFooterButtons(props: IButtonRenderProps<D>): ReactNode {
        const { defaultBackButton, defaultNextButton } = props;

        return <>
            {defaultBackButton}
            {defaultNextButton}
        </>;
    }
}

class WizardInitializePage<D extends WizardData> extends WizardPage<D> {
    constructor(
        wizardStrings: IWizardStrings,
        private readonly _initialize: () => Promise<void>
    ) {
        super(null, wizardStrings);
    }

    public async activate() {
        await this._initialize();
    }

    public get autoContinue(): boolean {
        return true;
    }

    public renderPage(props: IWizardPageProps<D>): React.ReactNode {
        return <Spinner size={SpinnerSize.large} label={cstrings.OneMoment} />;
    }
}

class WizardExecutePage<D extends WizardData> extends WizardPage<D> {
    constructor(
        wizardStrings: IWizardStrings,
        private readonly _execute: () => Promise<void>
    ) {
        super(null, wizardStrings);
    }

    public async activate() {
        await this._execute();
    }

    public get autoContinue(): boolean {
        return true;
    }

    public renderPage(props: IWizardPageProps<D>): React.ReactNode {
        return <Spinner style={{ marginTop: 20 }} size={SpinnerSize.large} label={cstrings.OneMoment} />;
    }
}

class WizardSuccessPage<D extends WizardData> extends WizardPage<D> {
    constructor(
        step: PageRenderer<D>,
        wizardStrings: IWizardStrings,
        private readonly _timeout: number,
        private readonly _onWizardComplete: () => void
    ) {
        super(step, wizardStrings);
    }

    public async activate() {
        setTimeout(this._onWizardComplete, this._timeout);
    }
}

export class Wizard<D extends WizardData> extends Component<IWizardProps<D>, IWizardState> {
    private static readonly defaultProps: Partial<IWizardProps<any>> = {
        successPageTimeout: 2500,
        onWizardComplete: noop
    };

    private readonly _pages: WizardPage<D>[];

    constructor(props: IWizardProps<D>) {
        super(props);

        const wizardStrings = { ...cstrings.Wizard, ...props.strings };
        this._pages = this._buildPages(props, wizardStrings);

        this.state = {
            currentPageIndex: -1,
            error: null
        };
    }

    public componentDidMount() {
        this._nextPage();
    }

    private readonly _goToPage = async (pageIndex: number) => {
        const currentPageIndex = this.state.currentPageIndex;
        const currentPage = this._pages[currentPageIndex];
        const isValid = currentPage ? currentPage.valid() : true;

        if (isValid && pageIndex < this._pages.length) {
            if (currentPage) {
                await currentPage.deactivate();
            }

            const newPage = this._pages[pageIndex];

            this.setState({
                currentPageIndex: pageIndex
            });

            try {
                await newPage.activate();
            } catch (e) {
                console.error(e);
                this.setState({ error: e });
            }
        }
    }

    private readonly _buildPages = (props: IWizardProps<D>, wizardStrings: IWizardStrings): WizardPage<D>[] => {
        const pages: WizardPage<D>[] = [];

        if (props.startPage) {
            const page = new WizardStartPage(props.startPage, wizardStrings, this._nextPage);
            pages.push(page);
        }

        if (props.initialize) {
            const page = new WizardInitializePage<D>(wizardStrings, props.initialize);
            pages.push(page);
        }

        props.stepPages.forEach((step, index, steps) => {
            const page = new WizardStepPage(step, wizardStrings, index + 1, steps.length, this._previousPage, this._nextPage);
            pages.push(page);
        });

        if (props.execute) {
            const page = new WizardExecutePage<D>(wizardStrings, () => props.execute(props.data));
            pages.push(page);
        }

        if (props.successPage) {
            const page = new WizardSuccessPage(props.successPage, wizardStrings, props.successPageTimeout, props.onWizardComplete);
            pages.push(page);
        }

        return pages;
    }

    private readonly _previousPage = () => {
        const currentPageIndex = this.state.currentPageIndex;
        const newPageIndex = currentPageIndex - 1;
        const currentPage = this._pages[currentPageIndex];
        const isValid = currentPage ? currentPage.valid() : true;

        if (isValid) {
            if (newPageIndex >= 0) {
                this._pages[currentPageIndex].deactivate();
                this._pages[newPageIndex].activate();

                this.setState({
                    currentPageIndex: newPageIndex
                });
            }
        }
    }

    private readonly _nextPage = async () => {
        const currentPageIndex = this.state.currentPageIndex;
        const newPageIndex = currentPageIndex + 1;
        const isLastPage = currentPageIndex === this._pages.length - 1;
        const currentPage = this._pages[currentPageIndex];
        const isValid = currentPage ? currentPage.valid() : true;

        if (isValid) {
            if (currentPage) {
                await currentPage.deactivate();
            }

            if (isLastPage) {
                this.props.onWizardComplete();
            } else {
                const newPage = this._pages[newPageIndex];

                this.setState({
                    currentPageIndex: newPageIndex
                });

                try {
                    await newPage.activate();
                } catch (e) {
                    console.error(e);
                    this.setState({ error: e });
                }

                if (newPage.autoContinue) {
                    this._nextPage();
                }
            }
        }
    }

    private readonly _renderProgressBar = () => {
        const { onDiscard } = this.props;
        const { currentPageIndex } = this.state;
        const stepPages = this._pages.filter(page => page instanceof WizardStepPage).map(page => page as WizardStepPage<D>);

        if (this._pages[currentPageIndex] instanceof WizardStartPage || stepPages.length === 0)
            return;

        return (
            <Stack className={styles.progressBar} horizontal horizontalAlign='space-evenly'>
                {stepPages.map((page, idx) => {
                    const PageIcon = idx < currentPageIndex ? CompletedSolidIcon : (idx === currentPageIndex ? RadioBtnOnIcon : CircleRingIcon);
                    const className = css(styles.statusIndicator, { [styles.futurePage]: idx > currentPageIndex });
                    return (
                        <StackItem key={idx} grow>
                            <PageIcon className={className} />
                            <div>{page.renderer.title}</div>
                        </StackItem>
                    );
                })}
                {onDiscard && <StackItem>
                    <IconButton
                        ariaLabel={cstrings.Wizard.CloseButtonAriaLabel}
                        iconProps={{ iconName: 'Cancel' }}
                        onClick={onDiscard}
                    />
                </StackItem>}
            </Stack>
        );
    }

    public render(): React.ReactElement<IWizardProps<D>> {
        const { data, className, headingLabel, heading } = this.props;
        const { currentPageIndex, error } = this.state;

        const currentPage = this._pages[currentPageIndex];
        const pageProps: IWizardPageProps<D> = {
            data,
            onClickEdit: this._goToPage
        };

        return (
            <div className={css(styles.wizard, className)}>
                <div className={styles.header}>
                    {heading || (headingLabel && <h1>{headingLabel}</h1>)}
                </div>
                {this._renderProgressBar()}

                {!error
                    ? currentPage?.renderPage(pageProps)
                    : <MessageBar messageBarType={MessageBarType.error}>{cstrings.GenericError}</MessageBar>
                }

                <Stack horizontal horizontalAlign="center" wrap className={styles.footer} tokens={{ childrenGap: 10 }}>
                    {currentPage?.renderFooterButtons(pageProps, !!error)}
                </Stack>
            </div>
        );
    }
}