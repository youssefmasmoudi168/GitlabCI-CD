import ScenarioDetailsTable from './ScenarioDetailsTable';
import { useLoaderData, useNavigate } from 'react-router';
import { useFetchUseCaseByScenarioIdQuery } from 'src/services/api/api';
import DashboardLayout from 'src/layouts/DashboardLayout';
import ActionBar from 'src/components/ActionBar';
import NoData from '../../../components/NoData';
import SuspenseLoader from 'src/components/SuspenseLoader';

function ScenarioDetails() {
  const scenarioId = useLoaderData();
  const {
    data: useCases,
    isSuccess,
    isError,
    isLoading
  } = useFetchUseCaseByScenarioIdQuery(scenarioId);
  const navigate = useNavigate();
  return (
    <>
      <DashboardLayout>
        <ActionBar
          title="Use Cases"
          subtitle="List of all use cases for this scenario"
        />
        {isSuccess && <ScenarioDetailsTable useCases={useCases} />}
        {isLoading && <SuspenseLoader />}
        {isError && (
          <NoData
            handleOpen={() => navigate('/dashboards/scenarios')}
            message="There are no available Use Cases"
            buttonText="Go Back to Scenarios"
          />
        )}
      </DashboardLayout>
    </>
  );
}

export default ScenarioDetails;
