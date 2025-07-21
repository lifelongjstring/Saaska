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
      <main className="main-content" style={{ marginLeft: 180 }}>
        <div className="dashboard-gradient-box" style={{ margin: '32px auto', padding: '32px 24px', maxWidth: 1200 }}>
          <div className="section-title" style={{ textAlign: 'center', color: 'black', marginBottom: 8 }}>Your Applications</div>
          <div style={{ textAlign: 'center', color: '#333', fontSize: '1.1rem', marginBottom: 24 }}>
            Track all the jobs you've applied for in one place.
          </div>
          {/* Remove the card-grid wrapper to allow ApplicationsTable to center */}
          <ApplicationsTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationsPage;
