import { ExperimentTable } from './components/experiment-table';
import styles from './Experiment.module.scss';
import { Charts } from './components/charts';
import { SubHeader } from './components/sub-header';
import { useExperimentData } from './components/hooks/useExperimentData';
import { ITestRunResult } from '../../../../shared/models/test-run-result.interface';
import { FetchDataStatus } from '../../../../shared/hooks/useFetch';
import { Spinner, SpinnerSize } from '../../../../shared/components/att-spinner';
import { Toggles } from './components/toggles';
import { ISpinner, useSpinnerContext } from '../../../../shared/context/spinner';

export type IExperimentData = {
  data: ITestRunResult;
}

export const Experiment: React.FC = () => {
  const { data: testRunData, status } = useExperimentData();

  return (
      <div className={styles.experiment_wrapper}>
        {status === FetchDataStatus.Fetching ? renderSpinner() : testRunData && <ExperimentContent data={testRunData} />}
      </div>
  );
}

const ExperimentContent: React.FC<IExperimentData> = (props: IExperimentData) => {
    const { data } = props;
    const { isSpinnerOn }: ISpinner = useSpinnerContext();

    return (
        <>
            {isSpinnerOn && renderSpinner()}
            <SubHeader data={data} />
            <Toggles />
            <ExperimentTable data={data} />
            <Charts data={data} />
        </>
    );
}

function renderSpinner() {
    return (
        <div className={styles.spinner_overlay}>
            <div className={styles.spinner_wrapper}>
            <Spinner size={SpinnerSize.MEDIUM} />
            </div>
        </div>
    );
}
