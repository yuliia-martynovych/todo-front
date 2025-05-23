import { useState, useEffect } from "react";
import { Mountain, Edit2, Trash2, PlusCircle, Check, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
    getTasksByUserId,
    deleteTask,
    updateTask,
    createTask,
} from "../services/taskService";

export default function TaskView() {
    /* ---------------------------- state management --------------------------- */
    // create‑task modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    // delete‑confirmation modal
    const [deleteId, setDeleteId] = useState(null);

    // inline edit
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [tasks, setTasks] = useState([]);

    // userId from URL
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");

    /* -------------------------------- handlers ------------------------------ */
    const openCreateModal = () => {
        setNewTitle("");
        setShowCreateModal(true);
    };
    const handleCreate = async () => {
        try {
            const task = await createTask({ name: newTitle, user_id: userId });
            setTasks([{ id: task.id, name: newTitle },...tasks]);
        } catch (error) {
            console.error("Error creating task:", error);
            alert(`${error.response.data.detail}` || "Failed to create task.");
        } finally {
            setShowCreateModal(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(deleteId);
            setTasks(tasks.filter((t) => t.id !== deleteId));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            alert("No se pudo eliminar la tarea.");
        } finally {
            setDeleteId(null);
        }
    };

    const startEditing = (id, currentTitle) => {
        setEditingId(id);
        setEditingText(currentTitle);
    };
    const saveEdit = async () => {
        try {
            await updateTask(editingId, { name: editingText.trim() });
            setTasks(
                tasks.map((t) =>
                    t.id === editingId ? { ...t, name: editingText.trim() } : t
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task.");
        } finally {
            setEditingId(null);
        }
    };

    useEffect(() => {
        async function fetchTasks() {
            const data = await getTasksByUserId(userId);
            setTasks(data);
        }
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    /* ---------------------------------- UI ---------------------------------- */
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-10">
            {/* logo + heading */}
            <Mountain size={64} color="white" className="mb-4" />
            <h1
                className="text-6xl font-extrabold text-white mb-10 drop-shadow-lg select-none"
                style={{ fontFamily: "'Barrio', cursive" }}
            >
                Taskify
            </h1>

            {/* task card */}
            <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-3xl w-full">
                {/* create button */}
                <button
                    onClick={openCreateModal}
                    className="flex items-center mb-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-5 rounded-lg transition shadow-md hover:shadow-lg"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Create Task
                </button>

              
                <ul className="divide-y divide-gray-300">
                    {tasks.length === 0 && (
                        <li className="text-center text-gray-500 py-4">
                            No tasks available
                        </li>
                    )}
                    {tasks.slice().reverse().map(({ id, name }) => (
                        <li
                            key={id}
                            className="flex justify-between items-center py-4"
                        >
                            
                            {editingId === id ? (
                                <input
                                    value={editingText}
                                    onChange={(e) =>
                                        setEditingText(e.target.value)
                                    }
                                    autoFocus
                                    className="flex-1 mr-4 p-2 border-b-2 border-pink-500 focus:outline-none bg-transparent text-gray-800 text-lg"
                                />
                            ) : (
                                <span className="text-gray-800 text-lg mr-4 flex-1">
                                    {name}
                                </span>
                            )}

                            {/* action buttons */}
                            <div className="flex space-x-3">
                                {editingId === id ? (
                                    <>
                                        <button
                                            onClick={saveEdit}
                                            title="Save"
                                            className="text-green-600 hover:text-green-800 transition"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            title="Cancel"
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            <X size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                startEditing(id, name)
                                            }
                                            title="Edit task"
                                            className="text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(id)}
                                            title="Delete task"
                                            className="text-red-600 hover:text-red-800 transition"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* --------------------------- create task modal -------------------------- */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Create New Task
                        </h2>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            autoFocus
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --------------------------- delete confirm modal --------------------------- */}
            {deleteId !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">
                            Delete this task?
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
