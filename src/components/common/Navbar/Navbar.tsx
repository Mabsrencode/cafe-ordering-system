import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="flex">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/logs">Logs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
