import * as React from "react";
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import * as moment from 'moment';
import { ChevronRight, ChevronRightOutlined, FileCopy } from "@material-ui/icons";
import styles from './Onedrivetable.module.scss';
import Link from '@material-ui/core/Link';
import * as strings from 'MyonedrivefilesWebPartStrings';

type OneDriveTableColumn = {
    key: string,
    label: any,
    isSortable?: boolean,
    valueFn?: (row: any, onClick?: () => void) => any,
};

const columns: OneDriveTableColumn[] = [
    {
        key: 'icon',
        label: (<FileCopy color="disabled" />),
        valueFn: (row) => getIcon(row.name)
    },
    {
        key: 'name',
        label: 'Name',
        valueFn: (row, onClick) => (
            <Link href={row.file && row.webUrl}
                target="_blank"
                className={styles.item}
                onClick={() => row.folder && onClick()}>{row.name}
            </Link>),
        isSortable: true
    },
    {
        key: 'lastModifiedDateTime',
        label: 'Modified',
        isSortable: true,
        valueFn: (row) => moment(row.lastModifiedDateTime).fromNow()
    },
    {
        key: 'lastModifiedBy',
        label: 'Modified By',
        valueFn: (row) => row.lastModifiedBy && row.lastModifiedBy.user && row.lastModifiedBy.user.displayName
    },
    {
        key: 'folder',
        label: 'File Size',
        valueFn: (row) => row.folder ? formatFolderItems(row.folder.childCount) : formatBytes(row.size)
    },
    {
        key: 'shared',
        label: 'Sharing',
        valueFn: (row) => row.shared ? "Shared" : "Private"
    },
];



function getIcon(fileName) {
    var extension = fileName.substring(fileName.lastIndexOf('.'));
    if (!extension.includes('.'))
        return <div className={styles.folderIcon}></div>;
    if (extension == ".docx")
        return <div className={styles.docIcon}></div>;
    else if (extension == ".xlsx")
        return <div className={styles.xlsxIcon}></div>;
    else if (extension == ".url")
        return <div className={styles.linkIcon}></div>;
    else if (extension == ".pptx")
        return <div className={styles.pptxIcon}></div>;
    else if (extension == ".pdf")
        return <div className={styles.pdfIcon}></div>;
    else if (extension == ".zip")
        return <div className={styles.zipIcon}></div>;
    else if (extension == ".png" || extension == ".gif" || extension == ".jpeg" || extension == ".jpg" || extension == ".bmp" || extension == ".tif" || extension == ".tiff")
        return <div className={styles.imgIcon}></div>;
    else if (extension == ".mp3" || extension == "wav" || extension == "wma" || extension == ".aac" || extension == ".flac")
        return <div className={styles.audioIcon}></div>;
    else if (extension == ".mp4" || extension == ".mov" || extension == ".wmv" || extension == ".avi" || extension == ".webm")
        return <div className={styles.videoIcon}></div>;
    else
        return <div className={styles.fileIcon}></div>;
}

function formatFolderItems(count: number) {
    let countItems = '';
    if (count == 1) {
        countItems = count + " " + "Item";
    }
    else {
        countItems = count + " " + "Items";
    }
    return countItems;
}

function formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
}

export function OneDriveTableHead(props: { order?: 'asc' | 'desc', orderBy?: string, onRequestSort?: Function, selectedFields: any[] }) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    let selectedFields = props.selectedFields.length ? ['icon', ...props.selectedFields.map(p => p.key)] : [];
    let filteredByKey: any = columns.filter(f => selectedFields.some(item => item === f.key));

    return (

        <TableHead >
            <TableRow>
                {
                    filteredByKey.map(c => (
                        <TableCell
                            className={styles.tblRoot}
                            key={c.key}
                            sortDirection={orderBy === c.key ? order : false}
                        >
                            {c.isSortable ? (<TableSortLabel
                                active={orderBy === c.key}
                                direction={orderBy === c.key ? order : 'asc'}
                                onClick={createSortHandler(c.key)}
                            >
                                {c.label}
                            </TableSortLabel>) : c.label}
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

export function OneDriveTableBody(props: { rows: any[], selectedFields: any[], onClick: (column: OneDriveTableColumn, row: any) => void }) {
    let { rows, onClick } = props;
    let selectedFields = props.selectedFields.length ? ['icon', ...props.selectedFields.map(p => p.key)] : [];
    let filteredByKey1: any[] = columns.filter(f => selectedFields.some(item => item === f.key));

    return (
        <TableBody>
            {rows.map(row => (
                <TableRow>
                    {
                        filteredByKey1.map(c => (
                            <TableCell>
                                {c.valueFn(row, () => onClick(c, row))}
                            </TableCell>
                        ))
                    }
                </TableRow>
            )
            )}
        </TableBody>
    );
}

function sortData(data: any[], orderBy: string, order: 'asc' | 'desc') {
    const orderMultiplier = order === 'asc' ? 1 : -1;
    return data.sort((v1, v2) => ((v1[orderBy] > v2[orderBy]) ? 1 : -1) * orderMultiplier);
}

export default function OneDriveTable(props: { data: any[], defaultSortKey?: string, selectedFields?: string[], activeFolder: string, getMyDriveFiles: (folderPath?: string) => void }) {
    const { data, defaultSortKey, selectedFields, activeFolder, getMyDriveFiles } = props;
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState(defaultSortKey || '');
    const activeFolderHierarchy = activeFolder.split('/').slice(1);

    let rows = sortData(data, orderBy, order);
    let folders = [], files = [];
    rows.forEach(r => {
        r.folder ? folders.push(r) : files.push(r);
    });

    rows = [...folders, ...files];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const tableCellClickHandler = (column: OneDriveTableColumn, row: any) => {
        if (column.key === 'name' && row.folder) {
            getMyDriveFiles(activeFolder + "/" + row.name);
        }
    };

    const breadcrumbClick = (index: number) => {
        let folderPath = '/' + activeFolderHierarchy.slice(0, index + 1).join('/');
        getMyDriveFiles(folderPath);
    };

    return (
        <React.Fragment>
            {selectedFields.length &&
                <React.Fragment>
                    <div className={styles.breadcrumb}>
                        <Link className={styles.breadcrumbLink}
                            onClick={() => getMyDriveFiles('')}>{strings.RootFiles}</Link>
                        {
                            activeFolderHierarchy.map((folder, index) => {
                                return <><ChevronRight color="disabled" />
                                    <Link className={styles.breadcrumbLink}
                                        onClick={() => breadcrumbClick(index)}>{folder}</Link>
                                </>;
                            })
                        }
                    </div>
                    <TableContainer>
                        <Table>
                            <OneDriveTableHead
                                order={order}
                                orderBy={orderBy}
                                selectedFields={columns.filter(c => selectedFields.length && selectedFields.includes(c.key))}
                                onRequestSort={handleRequestSort}></OneDriveTableHead>
                            <OneDriveTableBody
                                onClick={tableCellClickHandler}
                                selectedFields={columns.filter(c => selectedFields.length && selectedFields.includes(c.key))}
                                rows={rows}></OneDriveTableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            }
        </React.Fragment>
    );
}
