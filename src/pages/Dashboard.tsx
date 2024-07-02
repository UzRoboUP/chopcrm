import DashboardLayout from "../features/dashboard/DashboardLayout";
import Breadcrumbs from "../ui/Breadcrumb.tsx";
import Row from "../ui/Row.tsx";
function Dashboard() {

  return (
    <>
      <Row type="horizontal">
        <Breadcrumbs />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
