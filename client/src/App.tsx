import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Complaint from "./pages/Complaint";
import SensorData from "./ui/sensor-data";
import Upload from "./pages/Upload";
import SegmentId from "./pages/SegmentId";
import Login from "./pages/Login";
import RoadStatus from "./ui/road-status";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sensor-data" element={<SensorData />} />
          <Route path="/sensor-data/:id" element={<SegmentId />} />
          <Route path="/road-status" element={<RoadStatus />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
