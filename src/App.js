import "../src/tailwindcss/tailwind.css"
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Adduser from "./components/Adduser/Adduser";
import { useEffect, useState } from "react";
import Actions from "./components/Actions/Actions";
import axios from "axios";
import Transfer from "./components/Transfer/Transfer";
import Details from "./components/Details/DetailsPage";
import SignleUserDetails from "./components/Details/SignleUserDetails";
//process.env.REACT_APP_API
const URL = 'http://localhost:4000';
function App() {
  const [users, setUsers] = useState([])
  const [singleUser, setSingleUser] = useState(null)
  useEffect(() => {

    const request = axios.get(URL)
    request.then(res => {
      if (res.status === 200)
        setUsers(res.data)
    })
  }, [])

  const addedUser = user => setUsers([...users, user])
  const updateUser = (user1, user2 = null) => {
    const temp = users.map(u => {
      if (u._id === user1._id)
        u = { ...user1 }

      if (user2 && u._id === user2._id)
        u = { ...user2 }
      return u;
    })
    setUsers(temp)
  }

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Adduser users={users} setMainUsersList={addedUser} />} />
        <Route path="/actions" element={<Actions users={users} updateMainUsers={updateUser} />} />
        <Route path="/transfer" element={<Transfer users={users} updateMainUsers={updateUser} />} />
        <Route path="/details" element={<Details users={users} setSingleUser={setSingleUser} />} />
        <Route path="/userdetails" element={<SignleUserDetails user={singleUser} updateMainUsers={updateUser} setSingleUser={setSingleUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
