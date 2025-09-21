import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
const navLinks = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title:'RecipeBook' , link:'/recipebook'}
]

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)

  const handleShowNav = () => {
    setShowNav(!showNav)
  }

  return (
    <nav className="relative z-20 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-white px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* hamburger menu or cross icon */}
          <button
            onClick={handleShowNav}
            aria-label="Toggle Menu"
            className="md:hidden"
          >
            {showNav ? (
              <XIcon color="#202020" strokeWidth={3} size={25} />
            ) : (
              <MenuIcon color="#202020" strokeWidth={3} size={25} />
            )}
          </button>
          {/* logo */}
          <a
            href="https://www.codevertiser.com/"
            className="flex items-center gap-3"
          >
            <img
              src="https://res.cloudinary.com/dyvkdwzcj/image/upload/v1709055594/logo-1_vo1dni.png"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-stone-900 md:text-2xl">
              BestTech
            </span>
          </a>
          {/* nav links */}
          <div
            className={`absolute right-0 left-0 -z-10 flex w-full flex-col gap-3 bg-white p-3 shadow transition-all duration-300 ease-in-out md:relative md:top-auto md:right-auto md:left-0 md:z-auto md:flex-row md:shadow-none ${
              showNav ? 'top-[54px]' : 'top-[-165px]'
            }`}
          >
            {navLinks.map(({ title, link }, index) => (
              <NavLink
                key={index}
                to={link}
                className="rounded-md px-3 py-2 text-slate-500 transition-colors duration-100 ease-linear hover:bg-gray-700 hover:text-white"
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>

        <Link to="login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
