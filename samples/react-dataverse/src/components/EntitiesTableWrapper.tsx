import * as React from "react";
import { AadHttpClientFactory } from "@microsoft/sp-http";
import { DataverseTableService } from "../services/DataverseTableService";
import { Spinner } from "@fluentui/react";
import { EntitiesTable } from "./EntitiesTable";

export interface IEntitiesTableWrapperProps {
    environmentUri: string;
    tableName: string;
    clientFactory: AadHttpClientFactory,
    top?: number;
    filter?: string;
    select?: string;
}

export function EntitiesTableWrapper(props: IEntitiesTableWrapperProps): JSX.Element {
    const [entities, setEntities] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const fetchData: () => Promise<void> = async () => {
        try {
            const tmpClient = await props.clientFactory.getClient(props.environmentUri);
            const tableService = new DataverseTableService(tmpClient, props.environmentUri, props.tableName);
            const data = await tableService.getData(props.filter, props.select);
            setEntities(data.value);
        }
        catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        setLoading(true);

        fetchData().then(() => setLoading(false)).catch(() => setLoading(false));
    }, [props.tableName])
    return (<div>
        <div>
            <h1>Table Entity</h1>
            <p>Environment URI: {props.environmentUri}</p>
            <p>Table Name: {props.tableName}</p>
        </div>
        {loading && <Spinner />}
        {entities.length > 0 && <EntitiesTable key={props.tableName + entities.length} entities={entities} />}

    </div>
    );
}