import * as React from 'react';
import styles from './PersonalDashboard.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { IListItem } from '../models/IListItem';
import {
    Shimmer,
} from '@fluentui/react/lib/Shimmer';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ServiceScope } from '@microsoft/sp-core-library';
import { TemplateService } from '../services/TemplateService';
import { DataFetcherService } from '../services/DataFetcherService';
import * as dompurify from 'dompurify';
const purifier = dompurify['default'] as dompurify.DOMPurify;

interface IPersonalWidgetProps {
    widget: IListItem;
    serviceScope: ServiceScope;
}

const classNames = mergeStyleSets({
    wrapper: {
        selectors: {
            '& > .ms-Shimmer-container': {
                margin: '10px',
            },
            '.ms-Shimmer-shimmerWrapper': {
                height: 280,
            }
        },
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getShimmerStyles = (): any => {
    return {
        shimmerWrapper: [
            {
                backgroundColor: 'inherit',
            },
        ],
        shimmerGradient: [
            {
                backgroundColor: 'inherit',
                backgroundImage:
                    'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #c7e0f4 50%, rgba(255, 255, 255, 0) 100%)',
            },
        ],
    };
};

export const PersonalWidgetRenderer: React.FC<IPersonalWidgetProps> = (props) => {
    const [state, setState] = React.useState<{ isLoaded: boolean; results: string }>({
        isLoaded: false,
        results: '',
    });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchData = async (widget: IListItem, serviceScope: ServiceScope) => {
        const _apiServiceInstance = serviceScope.consume(DataFetcherService.serviceKey);
        const hbs: TemplateService = new TemplateService();

        if (!widget.api || widget.api === '') {
            setState({
                isLoaded: true,
                results: widget.error,
            });
            return;
        }

        try {
            let data;

            if (widget.api.indexOf('https://graph.microsoft.com/') === 0) {
                data = await _apiServiceInstance.executeMSGraphAPIRequest(widget.api);
            } else if (widget.clientId && widget.clientId !== '') {
                data = await _apiServiceInstance.executeADSecureAPIRequest(widget.api, widget.clientId);
            } else {
                data = await _apiServiceInstance.executePublicAPIRequest(widget.api);
            }

            const html = await hbs.renderTemplate(widget.display, data);
            setState({
                isLoaded: true,
                results: html,
            });
        } catch (error) {
            console.log(error);
            setState({
                isLoaded: true,
                results: widget.error,
            });
        }
    };


    React.useEffect(() => {
        fetchData(props.widget, props.serviceScope); // eslint-disable-line @typescript-eslint/no-floating-promises
    }, [props.widget, props.serviceScope]);

    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <Icon iconName={props.widget.icon} />
                {props.widget.title}
            </div>
            <div className={`${styles.content} ${props.widget.help || props.widget.details ? '' : styles.contentWithoutFooter}`}>
                <div className={classNames.wrapper}>
                    <Shimmer width="100%" styles={getShimmerStyles} isDataLoaded={state.isLoaded} >
                        {/* {parser(state.results || '')} */}
                        <div dangerouslySetInnerHTML={{ __html: purifier.sanitize(state.results || '') }} />
                    </Shimmer>
                </div>
            </div>
            {(props.widget.help || props.widget.details) && (
                <div className={styles.footer}>
                    {props.widget.help && (
                        <a href={props.widget.help} className={styles.text} rel="noopener noreferrer" target="_blank">
                            HELP &nbsp; {'>'}
                        </a>
                    )}
                    {props.widget.details && (
                        <a href={props.widget.details} className={styles.text} rel="noopener noreferrer" target="_blank">
                            VIEW DETAIL &nbsp; {'>'}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}