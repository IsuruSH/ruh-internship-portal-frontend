import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 20
  },
  weekHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  dateRange: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 15
  }
});

const DiaryPDF = ({ weeklyEntries }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Diary Summaries</Text>
      </View>

      {weeklyEntries.map((entry, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.weekHeader}>Week {entry.weekNumber}</Text>
          <Text style={styles.dateRange}>{entry.dateRange}</Text>
          <Text style={styles.content}>{entry.note}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default DiaryPDF;