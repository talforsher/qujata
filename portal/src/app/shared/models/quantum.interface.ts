import { SelectOptionType } from '../../components/protocol-query';
import { AttSelectOption } from '../components/att-select/AttSelect.model';

export type ChartDataMap = Map<AttSelectOption, ITestResponseData | undefined>;

export interface ITestParams {
  algorithms: SelectOptionType;
  iterationsCount: number
}

export interface ITestResponse {
  data: ITestResponseData;
}

export interface IQueryResponse {
  linkToResult: string;
}

export interface ITestResponseData {
  totalTime: number[];
  connectTime: number[];
  downloadSpeed: number[];
  serverMemory: number[];
  serverCpu: number[];
  clientMemory: number[];
  clientCpu: number[];
}

export interface ITimeDataItem {
  min: string;
  max: string;
  avg: string;
}

export interface ITimeData {
  totalTime: ITimeDataItem;
  connectTime: ITimeDataItem;
  downloadSpeed: ITimeDataItem;
}
