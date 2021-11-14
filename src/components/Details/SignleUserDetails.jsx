import axios from 'axios'
import React, { useState } from 'react'
const URL = 'http://localhost:4000/'

export default function SignleUserDetails({ user, updateMainUsers, setSingleUser }) {
    const [currUser, setCurrUser] = useState(user)
    const setActivity = async () => {
        const update = { ...user }
        update.isActive = !update.isActive
        const response = await axios.put(`${URL}${update._id}`, update)
        if (response.status === 200) {
            updateMainUsers(response.data)
            setCurrUser(response.data)
            setSingleUser(response.data)
        }
    }
    return (
        <div className="bg-gray-200 min-h-screen flex justify-center items-center shadow-xl">
            <div className="flex flex-col lg:flex-row w-full justify-center gap-7">
                <div className="bg-white w-full lg:w-1/3 p-10 rounded-lg order-2 lg:order-first">
                    <h1 className="text-gray-700 font-bold tracking-wider">Last Transaction</h1>
                    <p className="text-gray-500 mt-4">start enjoying all the Payment process </p>
                </div>
                <div className="w-full lg:w-1/5 order-1 lg:order-last flex flex-col justify-start gap-7">
                    <div className="bg-white p-2 rounded-lg text-center">
                        <img src="https://i.ytimg.com/vi/mtXQ-m2xPEY/maxresdefault.jpg" className="h-20 w-full object-cover content-center rounded-t-lg" alt="avatar" />
                        <div className="flex justify-center">
                            <img src="https://i.pravatar.cc/100" alt="avatar" />
                        </div>
                        <h1 className="text-center font-bold tracking-wider text-gray-700 mt-4">{currUser.name}</h1>

                        <span className="block bg-blue-700 my-2 py-2 px-4 rounded-full text-white text-sm font-semibold">{currUser.isActive ? 'active' : 'inactive'}</span>

                        <span className="block bg-blue-700 my-2 py-2 px-4 rounded-full text-white text-sm font-semibold" onClick={() => setActivity()} >SET ACTIVE/INACTIVE</span>
                        <div className="mt-5 flex justify-between mx-10 mb-5">
                            <div className="text-left">
                                <h1 className="text-gray-500">Balance</h1>
                                <p className="text-3xl text-gray-800">{currUser.cash}$</p>
                            </div>
                            <div className="text-left">
                                <h1 className="text-gray-500">Credit</h1>
                                <p className="text-3xl text-gray-800">{currUser.credit}$</p>
                            </div>
                            {/* <div className="text-left">
                                <h1 className="text-gray-500">Rank</h1>
                                <p className="text-3xl text-gray-800">12</p>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
