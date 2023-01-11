import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect} from "react";

import IAppShell from './components/IAppShell';
import DepartmentInfo from './views/DeparmentInfo';
import Departments from './views/Departments';
import Login from './views/Login';
import Registration from './views/Registration';
import ItemInfo from './views/ItemInfo';
import RoomInfo from './views/RoomInfo';


export function App() {

  
  return (
    <Router>
        <Routes>
          {
            !localStorage.getItem("token") &&
            <>
              <Route path={'/'} element={<IAppShell role={0} contain={<div>main</div>} />} />
              <Route path={'login'} element={<IAppShell role={0} contain={<Login />} />}/>
              <Route path={'register'} element={<IAppShell role={0} contain={<Registration />} />} />
            </>
          }

          {
            localStorage.getItem("token") &&
            <>
              <Route path={'/'} element={<IAppShell role={1} contain={<div>main</div>} />} />

              <Route path={'item/:name'} element={<IAppShell role={1} contain={<ItemInfo />} />}/>

              <Route path={'room/:name'} element={<IAppShell role={1} contain={<RoomInfo />} />} />

              <Route path={'departments'} element={<IAppShell role={1} contain={<Departments />} />} />
              <Route path={'department/:name'} element={<IAppShell role={1} contain={<DepartmentInfo />} />} />

              <Route path={'myaccount'} element={<IAppShell role={1} contain={<div>my account</div>} />} />
              <Route path={'assigment/request'} element={<IAppShell role={1} contain={<div>assigment request</div>} />} />
              <Route path={'assigment/accept'} element={<IAppShell role={1} contain={<div>assigment accept</div>} />} />
            </>
          }

          {/* {
            roleDB === 2 &&
            <>
              <Route path={'/'} element={<IAppShell role={2} contain={<div>main</div>} />} />
              <Route path={'/edit-users'} element={<IAppShell role={2} contain={<div>edyyt</div>} />} />
            </>
          } */}
    
          <Route path={'*'} element={<div><p>Podana strona nie istnieje</p></div>} />


        </Routes>
      </Router>

  );
}

export default App;
