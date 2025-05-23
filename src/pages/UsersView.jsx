import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mountain, PlusCircle, Trash2, List, Pencil } from "lucide-react";
import {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../services/userService.js";

export default function UsersView() {
    /* ------------------------------- state -------------------------------- */
    const [users, setUsers] = useState([]);

    // add-user modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("123456");
    const [newIsAdmin, setNewIsAdmin] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // delete modal
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    /* ---------------------------- handlers ---------------------------- */
    const openCreateModal = () => {
        setNewName("");
        setNewEmail("");
        setShowCreateModal(true);
    };

    const handleCreate = async () => {
        try {
            const user_data = {
                username: newName,
                email: newEmail,
                password: newPassword || "123456",
                is_admin: newIsAdmin,
            };
            const response = await createUser(user_data);
            if (response) {
                setUsers([{ id: response.id, ...user_data }, ...users]);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error creating user. Please try again.");
        } finally {
            setShowCreateModal(false);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const user_data = {
                username: newName,
                email: newEmail,
                password: newPassword,
                is_admin: newIsAdmin,
            };
            await updateUser(id, user_data);
            setUsers(
                users.map((user) =>
                    user.id === id ? { ...user, ...user_data } : user
                )
            );
        } catch (error) {
            console.error("Error updating user:", error);
            alert(
                `${error.response.data.detail}` ||
                    "An error occurred. Please try again."
            );
        } finally {
            setShowCreateModal(false);
            setEditingUser(null);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(deleteId);
            setUsers(users.filter((u) => u.id !== deleteId));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert(
                `${error.response.data.detail}` ||
                    "An error occurred. Please try again."
            );
        } finally {
            setDeleteId(null);
        }
    };

    const viewTasks = (id) => {
        navigate(`/tasks?userId=${id}`);
    };

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchTasks();
    }, []);

    /* -------------------------------- UI ------------------------------- */
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-10">
            {/* heading */}
            <Mountain size={64} color="white" className="mb-4" />
            <h1
                className="text-6xl font-extrabold text-white mb-10 drop-shadow-lg select-none"
                style={{ fontFamily: "'Barrio', cursive" }}
            >
                Users
            </h1>

            {/* users card */}
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-4xl w-full">
                {/* add user button */}
                <button
                    onClick={openCreateModal}
                    className="flex items-center mb-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-5 rounded-lg transition shadow-md hover:shadow-lg"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Add User
                </button>

                {/* list */}
                <ul className="divide-y divide-gray-300">
                    {users.length === 0 && (
                        <li className="text-center text-gray-500 py-4">
                            No users available
                        </li>
                    )}
                    {users.slice().reverse().map(({ id, username, email, is_admin }) => (
                        <li
                            key={id}
                            className="flex justify-between items-center py-4"
                        >
                            <div className="flex-1 mr-4">
                                <p className="text-gray-800 text-lg font-semibold">
                                    {username}
                                </p>
                                <p className="text-gray-600 text-sm">{email}</p>
                                <p className="text-gray-400 text-xs">
                                    Admin: {is_admin ? "Yes" : "No"}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                {/* view tasks */}
                                <button
                                    onClick={() => viewTasks(id)}
                                    title="View user's tasks"
                                    className="text-blue-600 hover:text-blue-800 transition"
                                >
                                    <List size={20} />
                                </button>
                                {/* delete user */}
                                <button
                                    onClick={() => setDeleteId(id)}
                                    title="Delete user"
                                    className="text-red-600 hover:text-red-800 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                                {/* edit user */}
                                <button
                                    onClick={() => {
                                        setNewName(username);
                                        setNewEmail(email);
                                        setNewPassword("123456");
                                        setNewIsAdmin(is_admin);
                                        setEditingUser(id);
                                        setShowCreateModal(true);
                                    }}
                                    title="Edit user"
                                    className="text-yellow-600 hover:text-yellow-800 transition"
                                >
                                    <Pencil size={20} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* create user modal */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingUser ? "Edit User" : "Add New User"}
                        </h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            autoFocus
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <input
                            type="text"
                            placeholder="Password (Default: 123456)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <span>
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={newIsAdmin}
                                onChange={(e) =>
                                    setNewIsAdmin(e.target.checked)
                                }
                            />{" "}
                            Is admin?{" "}
                        </span>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingUser(null);
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingUser ? () => handleUpdate(editingUser) : handleCreate}
                                className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
                            >
                                {editingUser ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* delete confirm */}
            {deleteId !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">
                            Delete this user?
                        </h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
