import { renderHook } from '@testing-library/react';
import { ITestRunResultData } from '../../../../../../../shared/models/test-run-result.interface';
import { sortDataByAlgorithm } from './test-run.utils';

const mockData: ITestRunResultData[] = [
  {
    id: 1,
    algorithm: "Algorithm1", 
    iterations: 1000,
    results:  
    { 
      averageCPU: 25.5, 
      averageMemory: 512, 
    } 
  },
  {
    id: 2,
    algorithm: "Algorithm2", 
    iterations: 100,
    results:  
    { 
      averageCPU: 25, 
      averageMemory: 52, 
    } 
  },
  {
    id: 3,
    algorithm: "Algorithm1", 
    iterations: 20000,
    results:  
    { 
      averageCPU: 25, 
      averageMemory: 52, 
    } 
  }
];

const mockData2: ITestRunResultData[] = [ 
  {
    id: 1,
    algorithm: "Algorithm1", 
    iterations: 100,
    results:  
    { 
      averageCPU: 25.5, 
      averageMemory: 512, 
    } 
  },
  { 
    id: 2,
    algorithm: "Algorithm2", 
    iterations: 100,
    results:  
    { 
      averageCPU: 25, 
      averageMemory: 52,
    } 
  },
  { 
    id: 3,
    algorithm: "Algorithm1", 
    iterations: 20000,
    results:  
    { 
      averageCPU: 25, 
      averageMemory: 52, 
    } 
  }
];

describe('test-run utils', () => {
    test('should sort data by algorithm', () => {
        const { result } = renderHook(() => sortDataByAlgorithm(mockData));
        expect(result.current[0]).toEqual({
          id: 1,
          algorithm: "Algorithm1", 
          iterations: 1000,
          results:  
          { 
            averageCPU: 25.5, 
            averageMemory: 512
          } 
        });
        expect(result.current).toEqual(mockData);
    });

    test('should sort data by algorithm and iterations', () => {
        const { result } = renderHook(() => sortDataByAlgorithm(mockData2));
        expect(result.current[0]).toEqual({
          id: 1, 
          algorithm: "Algorithm1", 
          iterations: 100,
          results:  
          { 
            averageCPU: 25.5, 
            averageMemory: 512
          } 
        });
    });

    test('should sort data by algorithm', () => {
        const { result } = renderHook(() => sortDataByAlgorithm(mockData));
        expect(result.current[0]).toEqual({
          id: 1,
          algorithm: "Algorithm1", 
          iterations: 1000,
          results:  
          { 
            averageCPU: 25.5, 
            averageMemory: 512, 
          } 
        });
        expect(result.current).toEqual(mockData);
    });
});
