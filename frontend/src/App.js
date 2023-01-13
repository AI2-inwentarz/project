import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useEffect} from "react";

import IAppShell from './components/IAppShell';
import DepartmentInfo from './views/DeparmentInfo';
import Departments from './views/Departments';
import Login from './views/Login';
import Registration from './views/Registration';
import ItemInfo from './views/ItemInfo';
import RoomInfo from './views/RoomInfo';
import Main from './views/Main';
import RequestAssigment from './views/RequestAssigment';
import RoomInfoEdit from './views/RoomInfoEdit';
import Myaccount from './views/MyAccount';
import DepartmentAdd from './views/DepartmentAdd';

let timejwt;

if(localStorage.getItem("token")){
  const json = localStorage.getItem("token");
  const item = JSON.parse(json)
  const jwt = item.value;
  timejwt = item.expiry;
}

const now = new Date().getTime();


export function App() {

  return (
    <Router>
        <Routes>
          {
            (!localStorage.getItem("token") || (localStorage.getItem("token") && timejwt < now)) &&
            <>
              <Route path={'/'} element={<IAppShell role={0} contain={<Main />} />} />
              <Route path={'login'} element={<IAppShell role={0} contain={<Login />} />}/>
              <Route path={'register'} element={<IAppShell role={0} contain={<Registration />} />} />
            </>
          }

          {
            localStorage.getItem("token") && timejwt >= now &&
            <>
              <Route path={'/'} element={<IAppShell role={1} contain={<Main />} />} />

              <Route path={'item/:name'} element={<IAppShell role={1} contain={<ItemInfo />} />}/>

              <Route path={'room/:departmentID/:roomID'} element={<IAppShell role={1} contain={<RoomInfo />} />} />
              <Route path={'room/:departmentID/:roomID/:itemID/edit'} element={<IAppShell role={1} contain={<RoomInfoEdit />} />} />

              <Route path={'departments'} element={<IAppShell role={1} contain={<Departments />} />} />
              <Route path={'department/:name'} element={<IAppShell role={1} contain={<DepartmentInfo />} />} />
              <Route path={'department/:department_id/add'} element={<IAppShell role={1} contain={<DepartmentAdd />} />} />

              <Route path={'myaccount'} element={<IAppShell role={1} contain={<Myaccount />} />} />
              <Route path={'assigment/request'} element={<IAppShell role={1} contain={<RequestAssigment />} />} />
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
