import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
const URL = 'http://localhost:4000/'

export default function Transfer({ users, updateMainUsers }) {
    const [fromUser, setFromUser] = useState(null)
    const [toUser, setToUser] = useState(null)
    const [msg, setMsg] = useState('')
    const [price, setPrice] = useState(null)
    const [activeUsers, setActiveUsers] = useState([])
    useEffect(() => {
        setActiveUsers(users.filter(user => user.isActive))
        return () => setActiveUsers([])
    }, [users])
    const fromOptions = activeUsers.map(user => {
        if ((toUser && toUser.name !== user.name) || !toUser)
            return <option key={user.name} value={user.name}>{user.name}</option>

        return null
    });
    const toOptions = activeUsers.map(user => {
        if ((fromUser && fromUser.name !== user.name) || !fromUser)
            return <option key={user.name} value={user.name}>{user.name}</option>
        return null
    });
    const updateMsg = (msg) => {
        setMsg(msg)
        setTimeout(() => {
            setMsg('')
        }, 1200)
    }
    const handleInput = (e) => {
        setPrice(parseInt(e.target.value))
    }
    const validateInput = () => {
        if (!fromUser) {
            updateMsg('You Have To Select Sending User')
            return false;
        }
        if (!toUser) {
            updateMsg('You Have To Select Reciving User')
            return false;
        }
        const reg = /^\d+$/;
        if (!reg.test(price)) {
            updateMsg('Wrong Input')
            return false;
        }
        return true;
    }
    const updateUsersData = async () => {
        const updatedFromUsed = { ...fromUser }
        updatedFromUsed.cash -= price
        const fromUserResponse = await axios.put(`${URL}${fromUser._id}`, updatedFromUsed)
        if (fromUserResponse.status === 200) {
            setFromUser(fromUserResponse.data);
        }
        else updateMsg('Something Went Wrong With Updating Sending User Data')

        const updatedToUser = { ...toUser }
        updatedToUser.cash += price
        const toUserResponse = await axios.put(`${URL}${toUser._id}`, updatedToUser)
        if (toUserResponse.status === 200) {
            setToUser(toUserResponse.data)
            updateMainUsers(fromUserResponse.data, toUserResponse.data)
        }
        else
            updateMsg('Something Went Wrong With Updating Reciving User Data')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            if (fromUser.cash + fromUser.credit >= price) {
                updateUsersData();
                updateMsg('Transfer Done Successfully')
            }
            else updateMsg('Sending User Doesn\'t Have Enough Money')

        }

    }
    return (
        <div className="container">
            <div className="w-full flex my-2">
                <div className="w-2/4 p-2 flex flex-col">
                    <label htmlFor="from" className="text-center mb-2">From</label>
                    <select className="border-2 border-solid rounded" name="from" onChange={(e) => {
                        e.target.value ?
                            setFromUser(activeUsers.find(u => u.name === e.target.value))
                            : setFromUser(null)
                    }}>
                        <option value="">Select Option</option>
                        {fromOptions}
                    </select>
                </div>
                <div className="w-2/4 p-2 flex flex-col">
                    <label htmlFor="to" className="text-center mb-2">To</label>
                    <select className="border-2 border-solid rounded" name="to" onChange={(e) => {
                        e.target.value ?
                            setToUser(activeUsers.find(u => u.name === e.target.value))
                            : setToUser(null)
                    }} >
                        <option value="">Select Option</option>
                        {toOptions}
                    </select>
                </div>
            </div>

            <form onSubmit={e => handleSubmit(e)} className="w-full flex justify-around align-center flex-col p-4">
                <label className="my-2" htmlFor="transfer">Enter Amount You Want To Transfer</label>
                <input type="text" className="border-2 border-gray-200 p-1 rounded border-solid my-2" onChange={e => handleInput(e)} />
                <input className="my-2 p-2 rounded bg-transparent border-2 border-solid border-blue-200" type="submit" value="Submit" />
            </form>
            {msg ?
                <div className={`flex w-3/4 m-auto  items-center bg-blue-500 text-white text-sm font-bold px-4 py-3`} role="alert">
                    <p>{msg}</p>
                </div>
                : null}

        </div>
    )
}
