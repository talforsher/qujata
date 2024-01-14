import { TableOptionsData } from '../../../constants/table-options.const';

export function convertDataToOptions(data: typeof TableOptionsData) {
  return [
    {
      label: 'iterations',
      value: data.options[0]
    },
    {
      label: 'results.averageCPU',
      value: data.options[1]
    },
    {
      label: 'results.averageMemory',
      value: data.options[2]
    }
  ];
}