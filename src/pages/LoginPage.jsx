import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      (username === "admin" && password === "admin") ||
      (username === "user" && password === "user")
    ) {
      localStorage.setItem("user", JSON.stringify({ username }))
      navigate("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      <h1
  className="text-6xl font-extrabold text-white mb-10 drop-shadow-lg select-none"
  style={{ fontFamily: "'Barrio', cursive" }}>Taskify</h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full"
        autoComplete="off"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">{error}</div>
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
          Sign In
        </button>
      </form>
    </div>
  )
}
