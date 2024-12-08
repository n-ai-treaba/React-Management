import { type Session } from "../../store/sessions-context";
import Button from "../ui/Button";

function SessionsItem(session: Session) {
  return (
    <article className="session-item" key={session.id}>
      <img src={session.image} alt="image describing session" />
      <div className="session-data">
        <div>
          <h3>{session.title}</h3>
          <p>{session.summary}</p>
        </div>
        <p className="actions">
          <Button to={session.id}>Learn More</Button>
        </p>
      </div>
    </article>
  );
}

export default SessionsItem;
