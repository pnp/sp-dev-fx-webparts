export interface IFitnessActivity {
    dataSourceId: string;
    maxEndTimeNs: string;
    minStartTimeNs: string;
    point: IFitnessPoint[];
}

export interface IFitnessPoint {
    dataTypeName: string;
    endTimeNanos: string;
    modifiedTimeMillis: string;
    value: IFitnessPointValue[];
}

export interface IFitnessPointValue {
    intVal: number;
    fpVal: number;
}