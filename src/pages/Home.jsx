import { Link } from "react-router"

const Home = () => {
  return (
    <div className="bg-black text-white text-3xl container-height w-full flex items-center justify-center text-center">
      <span>Laboratoria <Link to="/wsb" className="underline text-blue-600">WSB</Link> - Narzędzia do automatyzacji budowy oprogramowania</span>
    </div>
  )
}

export default Home