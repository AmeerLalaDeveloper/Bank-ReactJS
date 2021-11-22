import axios from 'axios'
import React, { useState } from 'react'
const URL = 'https://bank-ameer.herokuapp.com/'
export default function Adduser({ users, setMainUsersList }) {

    const [user, setUser] = useState({
        name: "",
        cash: 0,
        credit: 0,
        isActive: true
    })
    const [errMsg, setErrMsg] = useState('')
    const [succMsg, setSuccMsg] = useState('')

    const handleInput = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.name === '') {
            setErrMsg('Wrong Input');
            return;
        }
        const userExist = users.find(u => u.name === user.name)

        if (userExist) {
            setErrMsg('User Name Already Exist');
            return;
        }
        const response = await axios.post(URL, user)
        if (response.status === 200) {
            setMainUsersList(response.data)
            setSuccMsg('User Has Been Added Successfully')
        }
    }
    return (
        <div className="w-full m-auto mt-10 max-w-xs">
            <form onSubmit={e => handleSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" placeholder="Ameer..." onChange={e => handleInput(e)} />
                    <p className="text-red-500 text-xs italic">{errMsg}</p>

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Cash
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={0} type="text" name="cash" placeholder="0" disabled onChange={e => handleInput(e)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Credit
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0" name="credit" value={0} disabled onChange={e => handleInput(e)} />
                </div>
                <button className="shadow border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">Add</button>
            </form>
            <p className="text-green-500 text-xs italic">{succMsg}</p>
        </div>
    )
}
