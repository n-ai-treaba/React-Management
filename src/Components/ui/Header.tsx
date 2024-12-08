import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useSessionsContext } from "../../store/sessions-context";

function Header() {
  const { isOpenModal, openModal, closeModal } = useSessionsContext();

  const handleButtonClick = () => {
    console.log("Button clicked, isOpenModal:", isOpenModal);
    // Dispatch the action
    isOpenModal ? closeModal() : openModal("upcomingSession");
  };
  return (
    <div id="main-header">
      <h1>React Mentoring</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>Our Mission</NavLink>
          </li>
          <li>
            <NavLink to={"/sessions"}>Browse Sections</NavLink>
          </li>
          <li>
            <Button onClick={handleButtonClick}>Upcoming Sessions</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
