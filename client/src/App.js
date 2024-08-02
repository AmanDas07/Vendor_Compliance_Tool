import { Routes, Route } from 'react-router-dom';
import Trackers from './pages/Trackers.js';
import Workspace from './pages/Workspace.js'
function App() {
  return (
    <Routes>
      <Route path="/alltrackers" element={<Trackers />} />
      <Route path="/workspace" element={<Workspace />} />
    </Routes>
  );
}

export default App;
