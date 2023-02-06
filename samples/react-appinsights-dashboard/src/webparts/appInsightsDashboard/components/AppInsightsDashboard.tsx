import * as React from 'react';
import * as strings from 'AppInsightsDashboardWebPartStrings';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';
import { HttpClient } from '@microsoft/sp-http';
import PageViews from '../../../common/components/PageViews';
import UserStatistics from '../../../common/components/UserStatistics';
import PerformanceStatistics from '../../../common/components/PerformanceStatistics';
import Helper from '../../../common/Helper';
import styles from './AppInsightsDashboard.module.scss';


export interface IAppInsightsDashboardProps {
	AppId: string;
	AppKey: string;
	DisplayMode: DisplayMode;
	onConfigure: () => void;
	httpClient: HttpClient;
    cultureName:string;
}

export const AppInsightsProps = React.createContext<IAppInsightsDashboardProps>(null);

const AppInsightsDashboard: React.FunctionComponent<IAppInsightsDashboardProps> = (props) => {

	const [helper, setHelper] = React.useState<Helper>(null);   //KK

	React.useEffect(() => {
		setHelper(new Helper(props.AppId, props.AppKey, props.httpClient, props.cultureName));
	}, [props.AppId, props.AppKey]);

	return (
		<AppInsightsProps.Provider value={props}>
			<div className={styles.appInsightsDashboard}>
				<div className={styles.container}>
					{(!props.AppId || !props.AppKey) ? (
						<Placeholder iconName='Edit'
							iconText={strings.Config_IconText}
							description={props.DisplayMode === DisplayMode.Edit ? strings.Config_Desc : strings.Config_Desc_ReadMode}
							buttonLabel={strings.Config_ButtonText}
							hideButton={props.DisplayMode === DisplayMode.Read}
							onConfigure={props.onConfigure}
						/>
					) : (
							<>
								<div className={styles.row}>
									<PageViews helper={helper} />
								</div>
								<div className={styles.row}>
									<UserStatistics helper={helper} />
								</div>
								<div className={styles.row}>
									<PerformanceStatistics helper={helper} />
								</div>
							</>
						)}
				</div>
			</div>
		</AppInsightsProps.Provider>
	);
};

export default AppInsightsDashboard;