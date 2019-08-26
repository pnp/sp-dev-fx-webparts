import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import Loading from '../Loading/Loading';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import GetProvisioningTemplate from '../GetProvisioningTemplate/GetProvisioningTemplate';
import ApplyProvisioningTemplate from '../ApplyProvisioningTemplate/ApplyProvisioningTemplate';
import AppContext from './AppContext';
import * as Strings from "SiteProvisioningManagerWebPartStrings";
import styles from './App.module.scss';

const AppContent = () => {
const ctx = React.useContext(AppContext);
const {isLoading,messageBarSettings:{type,message,visible}} = ctx;
  
    return (
        <div>
            <div hidden={!visible} className={styles.topMargin}>
                <MessageBar messageBarType={type}>{message}</MessageBar>
            </div>
            <Loading hidden={!isLoading} />
            <Pivot linkSize={PivotLinkSize.large} hidden={isLoading}>
                <PivotItem headerText={Strings.GetTemplateLabel}>
                    <GetProvisioningTemplate />
                </PivotItem>
                <PivotItem headerText={Strings.ApplyTemplateLable}>
                    <ApplyProvisioningTemplate />
                </PivotItem>
            </Pivot>
        </div>
    );
};

export default AppContent;