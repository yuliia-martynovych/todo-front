import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mountain } from "lucide-react";
import { getUserByUsername } from "../services/userService";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await getUserByUsername(username);
            if (user && user.password === password) {
                localStorage.setItem("user", JSON.stringify(user));
                const usr = JSON.parse(localStorage.getItem("user"));
                console.log("User logged in successfully:", usr);
                if (user.is_admin === true) {
                    navigate("/dashboard");
                } else {
                    navigate(`/tasks?userId=${user.id}`);
                }
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
            {/* left-side shortcuts */}
            <div className="absolute top-4 left-4 flex gap-2">
                <button
                    onClick={() => navigate("/tasks")}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 text-pink-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
                >
                    Tasks
                </button>
                <button
                    onClick={() => navigate("/users")}
                    className="bg-white bg-opacity-80 hover:bg-opacity-100 text-pink-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
                >
                    Users
                </button>
            </div>

            {/* NEW top-right Log In button */}
            <button
                onClick={() => navigate("/register")}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-pink-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
                Sign&nbsp;In
            </button>

            <Mountain size={64} color="white" className="mb-4" />
            <h1
                className="text-6xl font-extrabold text-white mb-10 drop-shadow-lg select-none"
                style={{ fontFamily: "'Barrio', cursive" }}
            >
                Taskify
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full"
                autoComplete="off"
            >
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Log&nbsp;In
                </h2>

                {error && (
                    <div className="mb-4 text-center text-red-600 font-medium">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                    required
                    autoFocus
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg"
                >
                    Log&nbsp;In
                </button>
            </form>
        </div>
    );
}
