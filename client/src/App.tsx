import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import SensorStatus from "./ui/sensor-status";
import Complaint from "./pages/Complaint";
import SensorData from "./ui/sensor-data";

type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sensor-data" element={<SensorData />} />
          <Route path="/sensor-status" element={<SensorStatus />} />
          <Route path="/complaint" element={<Complaint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
