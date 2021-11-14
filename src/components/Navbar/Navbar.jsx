import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div
                className="
      container
      px-6
      py-3
      mx-auto
      md:flex md:justify-between md:items-center
    "
            >
                <div className="flex items-center text-2xl text-blue-900 justify-between">
                    <div>
                        Bank API
                    </div>


                    <div className="flex md:hidden">
                        {/* <button
                            type="button"
                            className="
            text-gray-500
            dark:text-gray-200
            hover:text-gray-600
            dark:hover:text-gray-400
            focus:outline-none focus:text-gray-600
            dark:focus:text-gray-400
          "
                            aria-label="toggle menu"
                        >
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path
                                    fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                ></path>
                            </svg>
                        </button> */}
                    </div>
                </div>


                <div className="items-center md:flex">
                    <div className="flex flex-col md:flex-row md:mx-6">
                        <Link
                            className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-indigo-500
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                            to="/"
                        >Add user</Link
                        >
                        <Link
                            className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-indigo-500
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                            to="/actions"
                        >Actions</Link
                        >
                        <Link
                            className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-indigo-500
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                            to="/transfer"
                        >Transfer</Link>
                        <Link
                            className="
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-indigo-500
            dark:hover:text-indigo-400
            md:mx-4 md:my-0
          "
                            to="/details"
                        >Details</Link
                        >
                    </div>

                    <div className="flex justify-center md:block">

                    </div>
                </div>
            </div>
        </nav >

    )
}
