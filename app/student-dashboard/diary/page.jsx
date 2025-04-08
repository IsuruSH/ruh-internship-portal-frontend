"use client";

import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaFilePdf, FaSave } from "react-icons/fa";
import { format, startOfWeek, endOfWeek, isWithinInterval, eachDayOfInterval } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DiaryPDF from "../../components/student-dashboard/layouts/DiaryPDF";

export default function DiaryUpdates() {
  // Daily Entry State
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dailyNote, setDailyNote] = useState("");
  
  // Weekly Entry State
  const [weekNumber, setWeekNumber] = useState("");
  const [weeklyNote, setWeeklyNote] = useState("");
  
  // All Entries
  const [entries, setEntries] = useState([]);
  
  // View Mode
  const [viewMode, setViewMode] = useState("daily");

  // Load saved entries
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  // Save entries
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  // Get week number from date
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Get date range for week
  const getWeekDates = (weekNum) => {
    const date = new Date(new Date().getFullYear(), 0, 1 + (weekNum - 1) * 7);
    const start = startOfWeek(date);
    const end = endOfWeek(date);
    return { start, end, dates: eachDayOfInterval({ start, end }) };
  };

  // Save daily entry
  const saveDailyEntry = () => {
    if (!date || !dailyNote) return;
    
    const weekNum = getWeekNumber(new Date(date));
    const newEntry = {
      id: Date.now(),
      type: 'daily',
      date,
      note: dailyNote,
      weekNumber: weekNum,
    };

    setEntries([...entries, newEntry]);
    setDailyNote("");
  };

  // Save weekly entry
  const saveWeeklyEntry = () => {
    if (!weekNumber || !weeklyNote) return;
    
    const { start, end } = getWeekDates(weekNumber);
    const newEntry = {
      id: Date.now(),
      type: 'weekly',
      weekNumber,
      note: weeklyNote,
      dateRange: `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`,
    };

    // Remove existing weekly entry if exists
    const filteredEntries = entries.filter(entry => 
      !(entry.type === 'weekly' && entry.weekNumber === weekNumber)
    );

    setEntries([...filteredEntries, newEntry]);
    setWeeklyNote("");
  };

  // Get all weekly entries
  const getWeeklyEntries = () => {
    return entries
      .filter(entry => entry.type === 'weekly')
      .sort((a, b) => a.weekNumber - b.weekNumber);
  };

  // Get daily entries for selected week
  const getDailyEntriesForWeek = (weekNum) => {
    const { start, end } = getWeekDates(weekNum);
    return entries
      .filter(entry => entry.type === 'daily')
      .filter(entry => isWithinInterval(new Date(entry.date), { start, end }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Diary Updates</h1>
        
        {/* Mode Selection */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex-1 py-2 text-center font-medium ${viewMode === 'daily' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setViewMode('daily')}
          >
            Daily Update
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${viewMode === 'weekly' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setViewMode('weekly')}
          >
            Weekly Update
          </button>
        </div>

        {/* Daily Update Section */}
        {viewMode === "daily" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Entry</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      max={format(new Date(), 'yyyy-MM-dd')}
                    />
                    <FaCalendarAlt className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Week {date ? getWeekNumber(new Date(date)) : ''}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Today's Note</label>
                  <textarea
                    value={dailyNote}
                    onChange={(e) => setDailyNote(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                    placeholder="Write about your day..."
                  />
                </div>
                
                <button
                  onClick={saveDailyEntry}
                  disabled={!date || !dailyNote}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Daily Entry
                </button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Weekly Preview</h3>
                {date && (
                  <div className="border border-gray-200 rounded p-3">
                    <p className="font-medium mb-2">
                      Week {getWeekNumber(new Date(date))} ({format(getWeekDates(getWeekNumber(new Date(date))).start, 'MMM d')} - {format(getWeekDates(getWeekNumber(new Date(date))).end, 'MMM d')})
                    </p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {getDailyEntriesForWeek(getWeekNumber(new Date(date))).map(entry => (
                        <div key={entry.id} className="border-l-2 border-blue-400 pl-2">
                          <p className="text-xs text-gray-600">{format(new Date(entry.date), 'EEE, MMM d')}</p>
                          <p className="text-sm">{entry.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Weekly Update Section */}
        {viewMode === "weekly" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Entry</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Week Number</label>
                  <input
                    type="number"
                    value={weekNumber}
                    onChange={(e) => setWeekNumber(e.target.value)}
                    min="1"
                    max="52"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter week number (1-52)"
                  />
                </div>
                
                {weekNumber && (
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Week {weekNumber} Dates:</p>
                    <p className="text-sm text-gray-600">
                      {format(getWeekDates(weekNumber).start, 'MMM d')} - {format(getWeekDates(weekNumber).end, 'MMM d')}
                    </p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Note</label>
                  <textarea
                    value={weeklyNote}
                    onChange={(e) => setWeeklyNote(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                    placeholder="Summarize your week..."
                  />
                </div>
                
                <button
                  onClick={saveWeeklyEntry}
                  disabled={!weekNumber || !weeklyNote}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  <FaSave /> Save Weekly Entry
                </button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Daily Entries This Week</h3>
                {weekNumber ? (
                  <div className="border border-gray-200 rounded p-3 max-h-96 overflow-y-auto">
                    {getDailyEntriesForWeek(weekNumber).length > 0 ? (
                      getDailyEntriesForWeek(weekNumber).map(entry => (
                        <div key={entry.id} className="mb-3 border-l-2 border-blue-400 pl-2">
                          <p className="text-xs font-medium text-gray-600">
                            {format(new Date(entry.date), 'EEE, MMM d')}
                          </p>
                          <p className="text-sm">{entry.note}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No daily entries for this week</p>
                    )}
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded p-3 h-40 flex items-center justify-center">
                    <p className="text-sm text-gray-500">Select a week to view daily entries</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* All Weekly Entries */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">All Weekly Entries</h3>
              <div className="border border-gray-200 rounded divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {getWeeklyEntries().length > 0 ? (
                  getWeeklyEntries().map(entry => (
                    <div key={entry.id} className="p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Week {entry.weekNumber}</p>
                          <p className="text-sm text-gray-600">{entry.dateRange}</p>
                          <p className="text-sm mt-1">{entry.note}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No weekly entries saved yet
                  </div>
                )}
              </div>
              
              {getWeeklyEntries().length > 0 && (
                <div className="mt-4 flex justify-end">
                  <PDFDownloadLink
                    document={
                      <DiaryPDF weeklyEntries={getWeeklyEntries()} />
                    }
                    fileName="all-weekly-summaries.pdf"
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaFilePdf /> Generate PDF of All Weeks
                  </PDFDownloadLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}