import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <header className="header">
      <div>Pradeep Lab.. 🚀</div>
      <nav>
        <Link to="/">
          <Button style={{ color: "white" }}>Home</Button>
        </Link>
        <Link to="/add">
          <Button variant="contained">Add User</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
