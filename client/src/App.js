import { Routes, Route } from 'react-router-dom';
import Trackers from './pages/Trackers.js';
import Workspace from './pages/Workspace.js'
import UserForm from './Secondary Pages/addUser.js';
import EditPage from './pages/editPage.js'
import CLRAForm from './Secondary Pages/clraForm.js';
import FormXXIV from './Secondary Pages/for14.js';
import ComplianceCertificateForm from './Secondary Pages/halfYearly.js';
import ComplianceCalendar from './pages/Dashboard.js';
function App() {
  return (
    <Routes>
      <Route path="/alltrackers" element={<Trackers />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/add_user" element={<UserForm />} />
      <Route path='/Edit/:uin' element={<EditPage />} />
      <Route path='/Dashboard' element={<ComplianceCalendar />} />
      <Route path='/INTEL_CLRA' element={<CLRAForm />} />
      <Route path='/Form_14' element={<FormXXIV />} />
      <Route path='/Half_Yearly' element={<ComplianceCertificateForm />} />
    </Routes>
  );
}

export default App;
/*



*/