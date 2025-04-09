// hooks/useStudentStatus.js
"use client";

import { useState, useEffect } from "react";
import api from "@/app/lib/axios";

export const useStudentStatus = (studentId) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get(`/api/v1/status/current/${studentId}`);
        setStatus(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStatus();
    }
  }, [studentId]);

  return { status, loading, error };
};
