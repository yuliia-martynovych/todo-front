import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mountain } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError("All fields are required")
      return
    }
    // simple “create user” mock: store in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ username: name, email })
    )
    navigate("/tasks") // go to TaskView
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      {/* back to Sign-In (optional) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-pink-700 font-semibold px-4 py-2 rounded-lg shadow-md transition"
      >
        Log&nbsp;In
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
          Sign&nbsp;In
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">{error}</div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          required
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
          Sign&nbsp;In
        </button>
      </form>
    </div>
  )
}
