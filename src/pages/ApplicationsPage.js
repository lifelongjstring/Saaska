// ApplicationsPage.tsx
import Sidebar from '../components/Sidebar';
import ApplicationsTable from '../components/ApplicationsTable';
import Footer from '../components/Footer';
import "../styles/resume.css";
import "../App.css";

/**
 * ApplicationsPage component displays the user's job applications.
 * @returns {JSX.Element} The rendered applications page.
 * @precondition Should be used within a React Router context.
 */
const ApplicationsPage = () => {
  return (
    <div className="resume-page-wrapper">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-gradient-box" style={{ margin: '32px auto', padding: '32px 24px', maxWidth: 1200 }}>
          <div className="section-title" style={{ textAlign: 'center', color: 'black', marginBottom: 8 }}>Your Applications</div>
          <div style={{ textAlign: 'center', color: '#333', fontSize: '1.1rem', marginBottom: 24 }}>
            Track all the jobs you've applied for in one place.
          </div>
          <div className="card-grid" style={{ margin: 0, padding: 0, boxShadow: 'none', background: 'none' }}>
            <ApplicationsTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
