"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import { useUser } from "../../../context/UserContext";
import { FaCheckCircle, FaLightbulb, FaChartLine } from "react-icons/fa";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SpiderWebChart = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get(`/student/recommend/${user.id}`);
        setRecommendations(response.data.recommendations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations");
        setLoading(false);
      }
    };

    if (user.id) {
      fetchRecommendations();
    }
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
        {error}
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-center">
        No recommendation data available
      </div>
    );
  }

  // Prepare data for radar chart
  const topRecommendations = recommendations.top_recommendations.slice(0, 5);
  const chartData = {
    labels: topRecommendations.map((rec) => rec.career),
    datasets: [
      {
        label: "Overall Score",
        data: topRecommendations.map((rec) => rec.score),
        backgroundColor: "rgba(15, 29, 47, 0.2)",
        borderColor: "rgba(15, 29, 47, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(15, 29, 47, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(15, 29, 47, 1)",
        pointHoverBorderColor: "#fff",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: "Academic Fit",
        data: topRecommendations.map((rec) =>
          parseFloat(rec.academic_fit.replace("%", ""))
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        pointHoverBorderColor: "#fff",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: false,
      },
      {
        label: "Skill Fit",
        data: topRecommendations.map((rec) =>
          parseFloat(rec.skill_fit.replace("%", ""))
        ),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(153, 102, 255, 1)",
        pointHoverBorderColor: "#fff",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "#6B7280",
        },
        angleLines: {
          color: "#E5E7EB",
        },
        grid: {
          color: "#E5E7EB",
        },
        pointLabels: {
          color: "#374151",
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value.toFixed(1)}%`;
          },
        },
        backgroundColor: "#0F1D2F",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodySpacing: 4,
        padding: 12,
        cornerRadius: 8,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: -0.2, // Makes the lines slightly curved
      },
    },
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden p-6">
      <h2 className="text-xl  font-semibold border-b text-gray-800 pb-3 mb-6">
        Career Recommendations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <div className="lg:col-span-2">
          <div className="h-[400px]">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Recommendation Details */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
              <FaChartLine className="text-blue-600" />
              Top Career Match
            </h3>
            <div className="bg-white p-3 rounded shadow-sm">
              <h4 className="font-bold text-gray-800">
                {topRecommendations[0].career}
              </h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Overall Score:</span>
                <span className="font-semibold text-blue-600">
                  {topRecommendations[0].score.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-500" />
              Your Strengths
            </h3>
            <ul className="space-y-2">
              {topRecommendations[0].strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-500"></span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Improvements */}
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
              <FaLightbulb className="text-yellow-500" />
              Suggested Improvements
            </h3>
            <ul className="space-y-2">
              {topRecommendations[0].suggested_improvements.map(
                (improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-500"></span>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Skill Analysis Section */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-4">Skill Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Identified Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendations.skill_analysis.identified_skills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full shadow-sm border border-gray-200"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Strongest Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendations.skill_analysis.strongest_skills.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full shadow-sm border border-blue-200 font-medium"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiderWebChart;
