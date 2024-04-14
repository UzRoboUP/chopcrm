import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../components/ui/Heading.tsx";
import Row from "../components/ui/Row.tsx";
import { getUserApi } from "../services/testUser.ts";
import { useEffect } from "react";
function Dashboard() {

  const getUser= async()=>{
    await getUserApi("users")
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  useEffect(()=>{
      getUser()
  },[])


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
