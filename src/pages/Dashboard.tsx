import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../components/ui/Heading.tsx";
import Row from "../components/ui/Row.tsx";

function Dashboard() {




  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
