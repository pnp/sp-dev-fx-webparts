export interface IPeopleDataResult {
    RelevantResults: {
        TotalRows: number,
        Table: {
            Rows: [{
                Cells: [{
                    Key: string,
                    Value: string,
                    ValueType: string,
                }]
            }]
        }
    }
}