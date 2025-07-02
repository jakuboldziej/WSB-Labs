import { Link } from "react-router"

const NavBar = () => {
  return (
    <div className="navbar-height flex items-center gap-4 px-6">
      <Link to="/" className="hover:text-gray-700">Home</Link>
      <Link to="wsb" className="hover:text-gray-700">WSB</Link>
      <Link to="nicosc1" className="hover:text-gray-700">Nicosc1</Link>
  )
}

export default NavBar