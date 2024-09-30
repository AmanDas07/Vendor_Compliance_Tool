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
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/alltrackers" element={<Trackers />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/add_user" element={<UserForm />} />
        <Route path='/Edit/:uin' element={<EditPage />} />

        <Route path="/dashboard/owner" element={<OwnerRoute />}>
          <Route path="" element={<ComplianceCalendar />} />
        </Route>

        <Route path="/dashboard/manager" element={<ManagerRoute />}>
          <Route path="" element={<ManagerDashboard />} />
        </Route>

        <Route path="/users" element={<Users />} />
        <Route path="/owner" element={<ComplianceCalendar />} />
        <Route path="/dashboard/manager" element={<ManagerDashboard />} />
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