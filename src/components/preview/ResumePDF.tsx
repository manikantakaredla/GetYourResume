import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link as PDFLink } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    marginBottom: 4,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#666',
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
    textTransform: 'uppercase',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  summary: {
    marginBottom: 10,
  },
  itemGroup: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    color: '#000',
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Oblique',
    color: '#444',
  },
  date: {
    color: '#666',
    fontSize: 9,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 5,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  skillsGroup: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    width: 60,
  },
  skillList: {
    flex: 1,
  }
});

export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && <Text> • LinkedIn: {data.personalInfo.linkedin}</Text>}
          {data.personalInfo.github && <Text> • GitHub: {data.personalInfo.github}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.careerInfo.summary && (
        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{data.careerInfo.summary}</Text>
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map(edu => (
            <View key={edu.id} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.college}</Text>
                <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
              </View>
              <View style={styles.itemHeader}>
                <Text style={styles.itemSubtitle}>{edu.degree} in {edu.branch}</Text>
                <Text>GPA: {edu.cgpa}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {(data.skills.programming.length > 0 || data.skills.frontend.length > 0) && (
        <View>
          <Text style={styles.sectionTitle}>Skills</Text>
          {Object.entries(data.skills).map(([category, skillsList]) => {
            if (skillsList.length === 0) return null;
            return (
              <View key={category} style={styles.skillsGroup}>
                <Text style={styles.skillCategory}>{category.charAt(0).toUpperCase() + category.slice(1)}:</Text>
                <Text style={styles.skillList}>{skillsList.join(', ')}</Text>
              </View>
            )
          })}
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map(exp => (
            <View key={exp.id} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.role}</Text>
                <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              {exp.bullets.map((bullet, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map(proj => (
            <View key={proj.id} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                <Text style={styles.date}>{proj.technologies.join(', ')}</Text>
              </View>
              {proj.bullets.map((bullet, i) => (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Certifications & Achievements */}
      {data.certifications.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {data.certifications.map(cert => (
            <View key={cert.id} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{cert.name}</Text>
                <Text style={styles.date}>{cert.year}</Text>
              </View>
              <Text>{cert.issuer}</Text>
            </View>
          ))}
        </View>
      )}

    </Page>
  </Document>
);
