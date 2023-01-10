import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IAppShell from './components/IAppShell';
import DepartmentInfo from './views/DeparmentInfo';
import Departments from './views/Departments';
import Login from './views/Login';
import Registration from './views/Registration';
import ItemInfo from './views/ItemInfo';
import RoomInfo from './views/RoomInfo';

export function App() {
  const roleDB = 1;
  return (
    <Router>
        <Routes>
          {
            roleDB === 0 &&
            <>
              <Route path={'/'} element={<IAppShell role={roleDB} contain={<div>main</div>} />} />
              <Route path={'login'} element={<IAppShell role={roleDB} contain={<Login />} />}/>
              <Route path={'register'} element={<IAppShell role={roleDB} contain={<Registration />} />} />
            </>
          }

          {
            roleDB === 1 &&
            <>
              <Route path={'/'} element={<IAppShell role={roleDB} contain={<div>main</div>} />} />

              <Route path={'item/:name'} element={<IAppShell role={roleDB} contain={<ItemInfo />} />}/>

              <Route path={'room/:name'} element={<IAppShell role={roleDB} contain={<RoomInfo />} />} />

              <Route path={'departments'} element={<IAppShell role={roleDB} contain={<Departments />} />} />
              <Route path={'department/:name'} element={<IAppShell role={roleDB} contain={<DepartmentInfo />} />} />

              <Route path={'myaccount'} element={<IAppShell role={roleDB} contain={<div>my account</div>} />} />
              <Route path={'assigment/request'} element={<IAppShell role={roleDB} contain={<div>assigment request</div>} />} />
              <Route path={'assigment/accept'} element={<IAppShell role={roleDB} contain={<div>assigment accept</div>} />} />
            </>
          }

          {
            roleDB === 2 &&
            <>
              <Route path={'/'} element={<IAppShell role={roleDB} contain={<div>main</div>} />} />
              <Route path={'/edit-users'} element={<IAppShell role={roleDB} contain={<div>edyyt</div>} />} />
            </>
          }
    
          <Route path={'*'} element={<div><p>Podana strona nie istnieje</p></div>} />


        </Routes>
      </Router>

  );
}

export default App;
