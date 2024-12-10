import { Routes, Route } from 'react-router-dom';
import Trackers from './pages/Trackers.js';
import Workspace from './pages/Workspace.js'
import UserForm from './Secondary Pages/addUser.js';
import EditPage from './pages/editPage.js'
import CLRAForm from './Secondary Pages/clraForm.js';
import FormXXIV from './Secondary Pages/for14.js';
import ComplianceCertificateForm from './Secondary Pages/halfYearly.js';
import ComplianceCalendar from './pages/Dashboard.js';
import Login from './pages/login.js';
import OwnerRoute from './Secondary Pages/Roles/ownerRoute.js';
import ManagerRoute from './Secondary Pages/Roles/managerRoute.js';
import ManagerDashboard from './pages/managerDashboard.js';
import { UserProvider } from './context/userContext.js';
import Users from './pages/usersPage.js';
import EditUser from './pages/editUser.js';
import AssignmentPage from './pages/trackerAssignment.js';
import InternalTrackers from './pages/internalTracker.js';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <UserProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/alltrackers" element={<Trackers />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/add_user" element={<UserForm />} />
        <Route path='/Edit/:uin' element={<EditPage />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/dashboard/owner" element={<OwnerRoute />}>
          <Route path="" element={<ComplianceCalendar />} />
        </Route>
        <Route path="/manage_tracker/assignment" element={<AssignmentPage />} />
        <Route path="/dashboard/manager" element={<ManagerRoute />}>
          <Route path="" element={<ManagerDashboard />} />
        </Route>

        <Route path="/manage/users" element={<Users />} />
        <Route path="/manage/internal-trackers" element={<InternalTrackers />} />
        <Route path="/owner" element={<ComplianceCalendar />} />
        <Route path='/INTEL_CLRA' element={<CLRAForm />} />
        <Route path='/Form_14' element={<FormXXIV />} />
        <Route path='/Half_Yearly' element={<ComplianceCertificateForm />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
/*

  <Route path="/dashboard/owner" element={<OwnerRoute />}>
        <Route path="" element={<ComplianceCalendar />} />
      </Route>

      <Route path="/dashboard/manager" element={<ManagerRoute />}>
        
      </Route>
     

*/