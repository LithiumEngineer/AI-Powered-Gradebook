import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Students from "./Students";
import Tests from "./Tests";
import { useAuth0 } from "@auth0/auth0-react";
import { RingLoader } from "react-spinners";

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("Overview");
  const { isAuthenticated, isLoading, user } = useAuth0();
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);

  if (user) console.log("Current User: ", user);
  if (isLoading) return <div className="flex h-screen justify-center items-center align-middle"><RingLoader /></div>;

  return (
    <div className="flex w-screen h-screen">
      <Sidebar
        selected={selectedTab}
        changeSelected={(selected) => setSelectedTab(selected)}
      />
      <div className="flex-1">
        {selectedTab === "Students" && <Students />}
        {selectedTab === "Tests" && <Tests />}
      </div>
    </div>
  );
};

export default Dashboard;
