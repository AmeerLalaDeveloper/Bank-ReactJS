import axios from 'axios'
import React, { useEffect, useState } from 'react'
const URL = 'http://localhost:4000/'
export default function Actions({ users, updateMainUsers }) {

    const [selectedUser, setSelectedUser] = useState(null)
    const [activeUsers, setActiveUsers] = useState([])
    useEffect(() => {
        setActiveUsers(users.filter(user => user.isActive))
        return () => setActiveUsers([])
    }, [users])
    const [showAction, setShowAction] = useState({
        deposit: 'hidden',
        withdraw: 'hidden',
        credit: 'hidden'
    })
    const [msg, setMsg] = useState('')
    const [input, setInput] = useState({
        deposit: '',
        withdraw: '',
        credit: ''
    })
    const options = activeUsers.map(user => {
        return <option key={user.name} value={user.name}>{user.name}</option>
    })
    const handleUserSelectedAction = (e) => {
        setShowAction({
            deposit: 'hidden',
            withdraw: 'hidden',
            credit: 'hidden', [e.target.value]: 'flex'
        })
    }
    const updateMsg = (msg) => {
        setMsg(msg)
        setTimeout(() => {
            setMsg('')
        }, 1200)
    }
    const handleInput = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    }
    const updateCredit = async (e) => {
        const updatedUser = { ...selectedUser }
        const reg = /^\d+$/;
        if (reg.test(input.credit)) {
            updatedUser.credit = input.credit;
            const response = await axios.put(`${URL}${selectedUser._id}`, updatedUser)
            if (response.status === 200) {
                setSelectedUser(response.data)
                updateMainUsers(response.data)
                updateMsg('Credit Updated Successfully')
            }
            else updateMsg('Something Went Wrong With Updating Data')

        }
        else updateMsg('Wrong Input')



    }
    const updateWithDraw = async (e) => {
        const reg = /^\d+$/;
        if (reg.test(input.withdraw)) {
            if ((selectedUser.cash - input.withdraw) <= (selectedUser.credit * -1)) {
                updateMsg('You Dont Have Enough Money')
            }
            else {
                const user = { ...selectedUser }
                user.cash -= input.withdraw;
                const response = await axios.put(`${URL}${selectedUser._id}`, user)
                if (response.status === 200) {
                    setSelectedUser(response.data)
                    updateMainUsers(response.data)
                    updateMsg('WithDrawed Successfully')
                }
                else updateMsg('Something Went Wrong With Updating Data')
            }

        }
        else {
            updateMsg('Wrong Input!!!')
        }
    }
    const updateCash = async (e) => {

        const reg = /^\d+$/;
        if (reg.test(input.deposit)) {

            const user = { ...selectedUser }
            user.cash += input.deposit;
            const response = await axios.put(`${URL}${selectedUser._id}`, user)
            if (response.status === 200) {
                setSelectedUser(response.data)
                updateMainUsers(response.data)
                updateMsg('Cash Added Successfully')
            }
            else updateMsg('Something Went Wrong With Updating Data')
        }
        else {
            updateMsg('Wrong Input!!!')
        }
    }
    return (
        <>
            {
                activeUsers.length === 0 ? <span className="w-2/4 m-auto block text-2xl text-red-500 ">No  Active Users </span> :
                    <select className="block w-2/4 mt-4 border-2 border-blue-200 border-solid m-auto rounded mb-4" onChange={e => setSelectedUser(activeUsers.find(user => user.name === e.target.value))}>
                        <option value="">Select Option</option>
                        {
                            options
                        }
                    </select>
            }
            {
                selectedUser ? <>
                    <ul className="flex justify-center w-3/4 m-auto ">
                        <li className="mr-6">
                            <button onClick={e => handleUserSelectedAction(e)} className="text-blue-500 hover:text-blue-800" value='deposit'>Deposit</button>
                        </li>
                        <li className="mr-6">
                            <button onClick={e => handleUserSelectedAction(e)} className="text-blue-500 hover:text-blue-800" value='withdraw'>WithDraw</button>
                        </li>
                        <li className="mr-6">
                            <button onClick={e => handleUserSelectedAction(e)} className="text-blue-500 hover:text-blue-800" value='credit'>UpdateCredit</button>
                        </li>
                    </ul>
                    <div className={`w-full  justify-center flex-col ${showAction.deposit}`}>
                        <span className="text-xl text-center my-4">
                            Enter Price To Deposit
                        </span>
                        <div className="my-4 px-4">
                            <input type="text" name="deposit" className="w-7/12 p-1 border-2 border-black rounded border-solid focus:border-blue-300" onChange={e => handleInput(e)} />
                            <button onClick={e => updateCash(e)} className="w-5/12 border-2 border-blue-300 border-solid p-1 rounded  text-lg bg-blue-300 text-white ">Deposit</button>
                            {msg ?
                                <div className={`flex  items-center bg-blue-500 text-white text-sm font-bold px-4 py-3`} role="alert">
                                    <p>{msg}</p>
                                </div>
                                : null}
                        </div>
                        <span className="w-2/4 text-center m-auto my-4 text-blue-400 text-xl">Current Cash: {selectedUser.cash}</span>
                    </div>
                    <div className={`w-full justify-center flex-col ${showAction.withdraw}`}>
                        <span className="text-xl text-center my-4">
                            Enter Price To Withdraw
                        </span>
                        <div className="my-4 px-4">
                            <input type="text" name="withdraw" onChange={e => handleInput(e)} className="w-7/12 p-1 border-2 border-black rounded border-solid focus:border-blue-300" />
                            <button onClick={e => updateWithDraw(e)} className="w-5/12 border-2 border-blue-300 border-solid p-1 rounded  text-lg bg-blue-300 text-white ">WithDraw</button>
                            {msg ?
                                <div className={`flex  items-center bg-blue-500 text-white text-sm font-bold px-4 py-3`} role="alert">
                                    <p>{msg}</p>
                                </div>
                                : null}

                        </div>
                        <span className="w-2/4 text-center m-auto my-4 text-blue-400 text-xl">Current Cash: {selectedUser.cash}</span>
                    </div>
                    <div className={`w-full  justify-center flex-col ${showAction.credit}`}>
                        <span className="text-xl text-center my-4">
                            Update Credit
                        </span>
                        <div className="my-4 px-4">
                            <input type="text" name="credit" className="w-7/12 p-1 border-2 border-black rounded border-solid focus:border-blue-300" onChange={e => handleInput(e)} />
                            <button onClick={e => updateCredit(e)} className="w-5/12 border-2 border-blue-300 border-solid p-1 rounded text-lg bg-blue-300 text-white ">Update</button>
                            {msg ?
                                <div className={`flex  items-center bg-blue-500 text-white text-sm font-bold px-4 py-3`} role="alert">
                                    <p>{msg}</p>
                                </div>
                                : null}
                        </div>
                        <span className="w-2/4 text-center m-auto my-4 text-blue-400 text-xl">Current Credit: {selectedUser.credit}</span>
                    </div>
                </>
                    : null
            }
        </>
    )
}
