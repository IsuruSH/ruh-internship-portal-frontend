"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

// Ensure RadialLinearScale is registered properly
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const SpiderWebChart = () => {
  // Dummy student data
  const studentData = {
    "Data Structure and Algorithms": 85,
    "Software Engineering": 90,
    "Object Oriented System Development": 75,
    "Internet Services and Web Development": 80,
    "Internet Programming": 70,
    "Multimedia and Video Production": 65,
    "System Analyst & Design": 78,
    "Project Management": 58,
    "Data and Network Security": 72,
    "E-commerce and Professional Practice": 50,
    "Database Management Systems": 55,
    "Group Projects": 79,
  };

  // Mapping course units to career fields
  const careerFields = {
    "Software Engineering": [
      "Data Structure and Algorithms",
      "Software Engineering",
      "Object Oriented System Development",
    ],
    "Web Development": [
      "Internet Services and Web Development",
      "Internet Programming",
      "Multimedia and Video Production",
    ],
    "Quality Assurance": [
      "System Analyst & Design",
      "Project Management",
      "Data and Network Security",
    ],
    "Business Analysis": [
      "E-commerce and Professional Practice",
      "Database Management Systems",
      "Project Management",
    ],
    "Project Management": [
      "Project Management",
      "Group Projects",
      "System Analyst & Design",
    ],
  };

  // Calculate average scores for each career field with fallback for missing data
  const [careerScores, setCareerScores] = useState([]);

  useEffect(() => {
    const scores = Object.keys(careerFields).map((field) => {
      const relatedCourses = careerFields[field];
      const totalScore = relatedCourses.reduce(
        (sum, course) => sum + (studentData?.[course] ?? 0),
        0
      );
      return relatedCourses.length > 0 ? totalScore / relatedCourses.length : 0;
    });
    setCareerScores(scores);
  }, []);

  // Radar chart data
  const data = {
    labels: Object.keys(careerFields),
    datasets: [
      {
        label: "Skill Level",
        data: careerScores,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[400px]">
      <h3 className="text-xl font-bold text-center mb-4">
        Student Skill Analysis
      </h3>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SpiderWebChart;
