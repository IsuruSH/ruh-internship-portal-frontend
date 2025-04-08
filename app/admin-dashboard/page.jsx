"use client";
import OverviewCards from "../components/OverViewCards";
import BatchSelector from "../components/BatchSelector";
import ChartsSection from "../components/ChartsSection";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedBatch, setSelectedBatch] = useState("2020/21");

  console.log("Selected Batch:", selectedBatch);
  return (
    <>
      <div className="flex justify-between items-center mb-8 my-10 mr-3">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <BatchSelector onBatchChange={setSelectedBatch} />
      </div>

      <OverviewCards batch={selectedBatch} />
      <ChartsSection />
    </>
  );
}
