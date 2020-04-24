import * as React from 'react';
import styles from '../SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { FileContentType } from '../../../../Common/IModel';
import SPHelper from '../../../../Common/SPHelper';

export interface ITemplatesStructureProps {
    helper: SPHelper;
    fileurl: string;
}

export default function TemplateStructure(props: ITemplatesStructureProps) {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [userprops, setUserProps] = React.useState<any[]>([]);

    const _loadTemplateStructure = async () => {
        let fileextn: string = props.fileurl.split('.').pop();
        let filecontent: any = null;
        let finaljson: any[] = [];
        if (fileextn.toLowerCase() === "csv") {
            let csvcontent = await props.helper.getFileContent(props.fileurl, FileContentType.Text);
            let re = /\"/gi;
            csvcontent.split(',').map((prop: string) => {
                finaljson.push(prop.replace(re, ''));
            });
        } else if (fileextn.toLowerCase() === "json") {
            filecontent = await props.helper.getFileContent(props.fileurl, FileContentType.JSON);
            Object.keys(filecontent[0]).map((key) => {
                finaljson.push(key);
            });
        }
        setLoading(false);
        setUserProps(finaljson);
    };

    React.useEffect(() => {
        _loadTemplateStructure();
    }, [props.fileurl]);

    return (
        <div>
            {loading &&
                <Spinner size={SpinnerSize.small} label={strings.TemplatePropsLoaderDesc} labelPosition={"top"} />
            }
            {!loading && userprops && userprops.length > 0 &&
                <div className={styles.propertyMappingContainer} data-is-focusable={true}>
                    {userprops.map((userprop: string) => {
                        return <div className={styles.propertydiv}>{userprop}</div>;
                    })
                    }
                </div>
            }
        </div>
    );
}