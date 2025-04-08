"use client";
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function BatchSelector({ onBatchChange }) {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("2020/21");

  useEffect(() => {
    // Replace with API call
    const fetchBatches = async () => {
      const mockBatches = [
        { id: "2020/21", name: "2020/21" },
        { id: "2021/22", name: "2021/22" },
        { id: "2022/23", name: "2022/23" },
      ];
      setBatches(mockBatches);
      setSelectedBatch(mockBatches[0].id);
    };

    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    if (onBatchChange) onBatchChange(batchId);
  };

  return (
    <div className="relative">
      <select
        value={selectedBatch}
        onChange={handleChange}
        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {batches.map((batch) => (
          <option key={batch.id} value={batch.id}>
            {batch.name}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
    </div>
  );
}
