import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import SessionSetup from "../components/StartPage/SessionSetup";
import ExistingSessions from "../components/StartPage/ExistingSessions";
import Header from "../components/Header";

export default function StartPage({}) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="">
      <Header />

      <div className="mx-5 my-5 lg:mx-20 bg-white p-5 rounded-lg shadow-sm">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Start new session" />
          <Tab label="Open Existing Session" />
        </Tabs>

        {currentTab === 0 && <SessionSetup />}
        {currentTab === 1 && <ExistingSessions />}
      </div>
    </div>
  );
}
