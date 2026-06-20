import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link as PDFLink } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Helper display link string parsers
const getLinkedInDisplay = (url: string) => {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^(www\.)?linkedin\.com\/in\//, '')
    .replace(/\/$/, '');
};

const getGitHubDisplay = (url: string) => {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^(www\.)?github\.com\//, '')
    .replace(/\/$/, '');
};

const getSkillCategoryName = (key: string) => {
  switch (key) {
    case 'programming': return 'Languages';
    case 'frontend': return 'Frontend Web Development';
    case 'backend': return 'Backend Web Development';
    case 'database': return 'Databases';
    case 'cloud': return 'Tools';
    case 'custom': return 'CS Fundamentals & Interests';
    default: return key.charAt(0).toUpperCase() + key.slice(1);
  }
};

// Create styles matching the classic serif academic format
const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 44,
    fontFamily: 'Times-Roman',
    fontSize: 9.5,
    color: '#000',
    lineHeight: 1.25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#000',
  },
  contactItem: {
    fontFamily: 'Times-Roman',
  },
  contactLink: {
    color: '#000',
    textDecoration: 'underline',
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    marginTop: 6,
    marginBottom: 8,
    width: '100%',
  },
  section: {
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    textTransform: 'none', // Experience, Projects, Achievements etc are Title Case in image, EDUCATION is Upper Case
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 1.5,
    marginBottom: 5,
    marginTop: 6,
  },
  itemGroup: {
    marginBottom: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 1,
  },
  itemTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 9.5,
  },
  itemSubtitle: {
    fontFamily: 'Times-Roman',
    fontSize: 9,
  },
  date: {
    fontFamily: 'Times-Roman',
    fontSize: 9,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginTop: 2,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Times-Roman',
  },
  skillsGroup: {
    flexDirection: 'row',
    marginTop: 2.5,
    fontSize: 9,
  },
  skillCategory: {
    fontFamily: 'Times-Bold',
  },
  skillList: {
    fontFamily: 'Times-Roman',
    flex: 1,
  }
});

export const ResumePDF = ({ data }: { data: ResumeData }) => {
  const hasSkills = Object.values(data.skills).some(list => list.length > 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contact}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            {data.personalInfo.phone && <Text style={styles.contactItem}> | {data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contactItem}> | {data.personalInfo.location}</Text>}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>
                {' | '}
                <PDFLink src={`https://${data.personalInfo.linkedin.replace(/^https?:\/\//, '')}`} style={styles.contactLink}>
                  linkedin/{getLinkedInDisplay(data.personalInfo.linkedin)}
                </PDFLink>
              </Text>
            )}
            {data.personalInfo.github && (
              <Text style={styles.contactItem}>
                {' | '}
                <PDFLink src={`https://${data.personalInfo.github.replace(/^https?:\/\//, '')}`} style={styles.contactLink}>
                  github/{getGitHubDisplay(data.personalInfo.github)}
                </PDFLink>
              </Text>
            )}
          </View>
          {/* Horizontal line right under header info */}
          <View style={styles.divider} />
        </View>

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { textTransform: 'uppercase' }]}>EDUCATION</Text>
            {data.education.map(edu => (
              <View key={edu.id} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree} in {edu.branch}</Text>
                  <Text style={styles.date}>{edu.startDate} – {edu.endDate}</Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text style={styles.itemSubtitle}>{edu.college}</Text>
                  <Text style={styles.date}>CGPA: {edu.cgpa}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map(exp => (
              <View key={exp.id} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.date}>{exp.startDate} – {exp.endDate}</Text>
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

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map(proj => (
              <View key={proj.id} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  {proj.github && (
                    <Text style={styles.date}>
                      <PDFLink src={`https://${proj.github.replace(/^https?:\/\//, '')}`} style={styles.contactLink}>
                        github/{getGitHubDisplay(proj.github)}
                      </PDFLink>
                    </Text>
                  )}
                </View>
                
                {/* Render Tech Stack as the first bullet item */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <View style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      <Text style={{ fontFamily: 'Times-Bold' }}>Tech Stack: </Text>
                      {proj.technologies.join(', ')}
                    </Text>
                  </View>
                )}

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

        {/* Achievements Section */}
        {data.achievements && data.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {data.achievements.map((ach, i) => (
              <View key={ach.id || i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{ach.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills & Interests Section */}
        {hasSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Interests</Text>
            {Object.entries(data.skills).map(([category, skillsList]) => {
              if (!skillsList || skillsList.length === 0) return null;
              return (
                <View key={category} style={styles.skillsGroup}>
                  <Text style={styles.skillCategory}>{getSkillCategoryName(category)}: </Text>
                  <Text style={styles.skillList}>{skillsList.join(', ')}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map(cert => (
              <View key={cert.id} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.date}>{cert.year}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};
