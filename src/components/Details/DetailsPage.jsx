import React, { useState } from 'react'
import UserDetail from './UsersDetail'

export default function Details({ users, setSingleUser }) {
    const [usersDetails, setUsersDetails] = useState(users.map(user => {
        return <UserDetail key={user._id} user={user} setSingleUser={setSingleUser}></UserDetail>
    })
    )
    const [smallToBig, setSmallToBig] = useState({
        name: false,
        cash: false
    })
    const sortByName = () => {
        setSmallToBig({ name: !smallToBig.name, cash: smallToBig.cash })
        setUsersDetails(users.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return smallToBig.name ? -1 : 1;
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return smallToBig.name ? 1 : -1
            return 0;
        }).map(user => {
            return <UserDetail key={user._id} user={user} setSingleUser={setSingleUser}></UserDetail>
        }))

    }
    const sortByCash = () => {
        setSmallToBig({ name: smallToBig.name, cash: !smallToBig.cash })
        setUsersDetails(users.sort((a, b) => {
            if (a.cash > b.cash)
                return smallToBig.cash ? -1 : 1
            if (a.cash < b.cash)
                return smallToBig.cash ? 1 : -1
            return 0;
        }).map(user => {
            return <UserDetail key={user._id} user={user} setSingleUser={setSingleUser}></UserDetail>
        }))

    }
    return (
        <div className={`flex items-center justify-center bg-white my-4`}>
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-400 border-separate space-y-6 text-sm">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3" onClick={sortByName}>Name</th>
                                <th className="p-3 text-left" onClick={sortByCash}>Cash</th>
                                <th className="p-3 text-left">Credit</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersDetails}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
