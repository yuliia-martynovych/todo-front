import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-10 drop-shadow-lg select-none" style={{ fontFamily: "'Barrio', cursive" }}>
        Welcome to the Dashboard!
      </h1>

      <div className="flex space-x-6 mb-10">
        <button
          onClick={() => navigate("/tasks")}
          className="bg-white bg-opacity-90 text-pink-700 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition hover:bg-opacity-100"
        >
          Tasks
        </button>
        <button
          onClick={() => navigate("/users")}
          className="bg-white bg-opacity-90 text-pink-700 font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition hover:bg-opacity-100"
        >
          Users
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition"
      >
        Logout
      </button>
    </div>
  )
}
