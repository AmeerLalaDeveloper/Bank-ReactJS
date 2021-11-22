import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const URL = 'https://bank-ameer.herokuapp.com/'
export default function UserDetail({ user, setSingleUser }) {

    const navigate = useNavigate();
    const fetchSingleUser = async () => {

        const response = await axios.get(`${URL}${user._id}`)
        if (response.status === 200) {
            setSingleUser(response.data)
            navigate("/userdetails");
        }


    }
    return (

        <tr key={user._id} className={`bg-blue-600 text-white cursor-pointer hover:bg-blue-400`} onClick={() => fetchSingleUser()}>
            <td className="p-3 text-left">{user.name}</td>
            <td className="p-3 text-left">{user.cash}</td>
            <td className="p-3 text-left">{user.credit}</td>
            <td className="p-3 text-left">{user.isActive ? <span className="bg-green-400 text-gray-50 rounded-md px-2">Active</span> : <span className="bg-red-400 text-gray-50 rounded-md px-2">Active</span>}</td>

        </tr>


    )
}
