// src/ProfilePage.jsx
import { useState } from 'react';
import { User, Book, BarChart3, Settings, Edit3, Shield, Users, FileText } from 'lucide-react';

function ProfilePage({ ToHome }) {
  // Temporary state to let you test the different views
  const [role, setRole] = useState("Student"); 

  // Mock data tailored for the Student view
  const studentData = {
    name: "Min Thu Kha",
    email: "minthukha@student.edu",
    bio: "Information Technology student.",
    stats: [
      { label: "Modules Completed", value: "12", icon: <Book size={20} /> },
      { label: "Average Score", value: "85%", icon: <BarChart3 size={20} /> }
    ]
  };

  // Mock data for the Teacher view
  const teacherData = {
    name: "Jane Smith",
    email: "jsmith@faculty.edu",
    bio: "Senior Lecturer - DevOps & Software App Development.",
    stats: [
      { label: "Quizzes Created", value: "24", icon: <FileText size={20} /> },
      { label: "Total Students", value: "156", icon: <Users size={20} /> }
    ]
  };

  // Mock data for the Admin view
  const adminData = {
    name: "System Administrator",
    email: "admin@learningquest.com",
    bio: "Platform maintenance and user management.",
    stats: [
      { label: "Active Users", value: "1,204", icon: <Users size={20} /> },
      { label: "System Health", value: "99.9%", icon: <Shield size={20} /> }
    ]
  };

  // Determine which data to show based on the current role
  const currentData = 
    role === "Student" ? studentData : 
    role === "Teacher" ? teacherData : adminData;

  return (
    <div style={styles.container}>
      
      {/* DEV TOOL: Remove this later when roles are fetched from your database */}
      <div style={styles.roleSwitcher}>
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Test View As:</span>
        <button onClick={() => setRole("Student")} style={role === "Student" ? styles.activeBtn : styles.inactiveBtn}>Student</button>
        <button onClick={() => setRole("Teacher")} style={role === "Teacher" ? styles.activeBtn : styles.inactiveBtn}>Teacher</button>
        <button onClick={() => setRole("Admin")} style={role === "Admin" ? styles.activeBtn : styles.inactiveBtn}>Admin</button>
      </div>

      <div style={styles.profileCard}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.avatar}>
            <User size={50} color="#fff" />
          </div>
          <div style={styles.userInfo}>
            <h1 style={styles.name}>{currentData.name}</h1>
            <p style={styles.email}>{currentData.email}</p>
            <span style={styles.roleBadge}>{role}</span>
          </div>
          <button style={styles.editButton}>
            <Edit3 size={16} style={{ marginRight: '8px' }} />
            Edit Profile
          </button>
        </div>

        <p style={styles.bio}>{currentData.bio}</p>

        {/* Dynamic Stats Grid */}
        <div style={styles.statsGrid}>
          {currentData.stats.map((stat, index) => (
            <div key={index} style={styles.statBox}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Role-Specific Action Buttons */}
        <div style={styles.actionsContainer}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          
          {role === "Student" && (
            <div style={styles.actionGrid}>
              <button style={styles.actionCard} onClick={ToHome}>View My Modules</button>
              <button style={styles.actionCard}>Review Past Quizzes</button>
              <button style={styles.actionCard}>Download Certificates</button>
            </div>
          )}

          {role === "Teacher" && (
            <div style={styles.actionGrid}>
              <button style={styles.actionCard}>Create New Quiz</button>
              <button style={styles.actionCard}>Grade Pending Responses</button>
              <button style={styles.actionCard}>View Student Analytics</button>
            </div>
          )}

          {role === "Admin" && (
            <div style={styles.actionGrid}>
              <button style={styles.actionCard}>Manage Users</button>
              <button style={styles.actionCard}>View System Logs</button>
              <button style={styles.actionCard}>Platform Settings</button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

// Inline styles to ensure it looks good immediately without a CSS file
const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },
  roleSwitcher: {
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  activeBtn: {
    backgroundColor: '#000', color: '#fff', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer'
  },
  inactiveBtn: {
    backgroundColor: '#e9ecef', color: '#000', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer'
  },
  profileCard: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '800px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '40px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #eaeaea',
    paddingBottom: '20px',
    marginBottom: '20px',
    position: 'relative'
  },
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#000',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfo: {
    flex: 1
  },
  name: {
    margin: '0 0 5px 0',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  email: {
    margin: '0 0 10px 0',
    color: '#666',
    fontSize: '14px'
  },
  roleBadge: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  editButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  bio: {
    color: '#444',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '30px'
  },
  statsGrid: {
    display: 'flex',
    gap: '20px',
    marginBottom: '40px'
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    border: '1px solid #eaeaea',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  statIcon: {
    backgroundColor: '#000',
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  },
  statLabel: {
    color: '#666',
    fontSize: '14px',
    margin: '0'
  },
  actionsContainer: {
    borderTop: '1px solid #eaeaea',
    paddingTop: '20px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  actionCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  }
};

export default ProfilePage;