import styled from "styled-components";
import Spinner from "../../components/ui/Spinner.tsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const isLoading = false;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      Welcome to Dashboard ...
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
