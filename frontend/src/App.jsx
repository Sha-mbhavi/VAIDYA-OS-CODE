import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import ConsultationsPage from './pages/ConsultationsPage';
import DoctorPage from './pages/DoctorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import VoicePage from './pages/VoicePage';
import AdminPage from './pages/AdminPage';
import HistoryPage from './pages/HistoryPage';
import ClinicalReviewPage from './pages/ClinicalReviewPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <DashboardPage />
          </Layout>
        }
      />
      <Route
        path="/patients"
        element={
          <Layout>
            <PatientsPage />
          </Layout>
        }
      />
      <Route
        path="/consultations"
        element={
          <Layout>
            <ConsultationsPage />
          </Layout>
        }
      />
      <Route
        path="/doctor"
        element={
          <Layout>
            <DoctorPage />
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <AnalyticsPage />
          </Layout>
        }
      />
      <Route
        path="/voice"
        element={
          <Layout>
            <VoicePage />
          </Layout>
        }
      />
      <Route
        path="/history"
        element={
          <Layout>
            <HistoryPage />
          </Layout>
        }
      />
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      />
      <Route
        path="/clinical-review"
        element={
          <Layout>
            <ClinicalReviewPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
