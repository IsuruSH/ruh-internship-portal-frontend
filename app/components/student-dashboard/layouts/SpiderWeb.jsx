'use client';

import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

// Ensure RadialLinearScale is registered properly
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const gradeToPoints = {
  'A+': 12, 'A': 11, 'A-': 10,
  'B+': 9, 'B': 8, 'B-': 7,
  'C+': 6, 'C': 5, 'C-': 4,
  'D+': 3, 'D': 2, 'D-': 1,
  'E': 0,
};

const SpiderWebChart = () => {
  // Dummy student grade data
  const studentGrades = {
    'Data Structure and Algorithms': 'A',
    'Software Engineering': 'A-',
    'Object Oriented System Development': 'B+',
    'Internet Services and Web Development': 'B',
    'Internet Programming': 'C+',
    'Multimedia and Video Production': 'C',
    'System Analyst & Design': 'B-',
    'Project Management': 'C-',
    'Data and Network Security': 'B+',
    'E-commerce and Professional Practice': 'D+',
    'Database Management Systems': 'C',
    'Group Projects': 'B',
  };

  // Convert grades to points
  const studentData = Object.fromEntries(
    Object.entries(studentGrades).map(([course, grade]) => [course, gradeToPoints[grade] || 0])
  );

  // Mapping course units to career fields
  const careerFields = {
    'Software Engineering': ['Data Structure and Algorithms', 'Software Engineering', 'Object Oriented System Development'],
    'Web Development': ['Internet Services and Web Development', 'Internet Programming', 'Multimedia and Video Production'],
    'Quality Assurance': ['System Analyst & Design', 'Project Management', 'Data and Network Security'],
    'Business Analysis': ['E-commerce and Professional Practice', 'Database Management Systems', 'Project Management'],
    'Project Management': ['Project Management', 'Group Projects', 'System Analyst & Design'],
  };

  // Calculate average scores for each career field
  const [careerScores, setCareerScores] = useState([]);

  useEffect(() => {
    const scores = Object.keys(careerFields).map((field) => {
      const relatedCourses = careerFields[field];
      const totalScore = relatedCourses.reduce((sum, course) => sum + (studentData?.[course] ?? 0), 0);
      return relatedCourses.length > 0 ? (totalScore / (relatedCourses.length * 12)) * 100 : 0; // Normalize to 100 scale
    });
    setCareerScores(scores);
  }, []);

  // Radar chart data
  const data = {
    labels: Object.keys(careerFields),
    datasets: [
      {
        label: 'Skill Level',
        data: careerScores,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
      <h2 className="text-xl font-bold text-center mb-4">Student Skill Analysis</h2>
      <Radar data={data} options={options} />
    </div>
  );
};

export default SpiderWebChart;
