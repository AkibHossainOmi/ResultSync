import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../Hooks/UseAuth";
// import { clearUserStatus, getLoggedInStatus, setLoggedIn } from "./Status";

export default function Navbar() {
//   const isAuthenticated = parseInt(getLoggedInStatus());
//   const history = useNavigate();
  // const dropdownRef = useRef(null);

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleLogout = (event) => {
  //   event.preventDefault();
  //   setLoggedIn(0);
  //   clearUserStatus();
  //   history('/login');
  //   window.location.reload();
  //   console.log("Logged out successfully");
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const closeDropdown = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };


//   useEffect(() => {
//     document.addEventListener("mousedown", closeDropdown);

//     return () => {
//       document.removeEventListener("mousedown", closeDropdown);
//     };
//   }, []);

const isAuthenticated = useAuth();
const navigate = useNavigate();

const handleLogout = (event) => {
  localStorage.removeItem('authToken');
  console.log("Logged out successfully");
  navigate("/login");
};

  return isAuthenticated? 
  (<>
      <nav className="fixed flex w-full p-8 bg-slate-500 top-0 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-16">
        <div className="flex items-center justify-between w-full">
            <div className="hidden sm:flex space-x-4 items-center">
                <Link to="/" className="text-white font-bold text-lg hover: flex justify-center">
                    <img src="ResultMage.png" alt="ResultSync Logo" className="h-8 w-12 invert" />
                </Link>
                <Link to="/" className="pl-5 text-white text-lg hover: ">
                    Home
                </Link>
                <Link to="/result" className="text-white text-lg hover: ">
                    Result
                </Link>
                <Link to="/subject" className="text-white text-lg hover: ">
                    Subject
                </Link>
                <Link to="/student" className="text-white text-lg hover: ">
                    Student
                </Link>
            </div>
            <div className="hidden sm:flex flex items-center">
                <Link to="/login" onClick={handleLogout} className="text-white text-lg hover:">
                    Logout
                </Link>
            </div>
        </div>
    </nav>
  </>)
  : (
    <>
     <nav className="fixed flex w-full p-8 bg-slate-500 top-0 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-16">
        <div className="flex items-center justify-between w-full">
            <div className="hidden sm:flex space-x-4 items-center">
                <Link to="/" className="text-white font-bold text-lg hover: flex justify-center">
                    <img src="ResultMage.png" alt="ResultSync Logo" className="h-8 w-12 invert" />
                </Link>
                <Link to="/" className="pl-5 text-white text-lg hover: ">
                    Home
                </Link>
            </div>
            <div className="hidden sm:flex flex items-center">
                <Link to="/login" className="text-white text-lg hover:">
                    Login
                </Link>
            </div>
        </div>
    </nav>
    </>
  );
}