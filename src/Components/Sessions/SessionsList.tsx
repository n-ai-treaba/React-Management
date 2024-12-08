import { type Session } from "../../store/sessions-context";
import SessionsItem from "./SessionsItem";

type SessionsListProps = {
  sessions: Session[];
};

function SessionsList({ sessions }: SessionsListProps) {
  return (
    <ul id="sessions-list">
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionsItem {...session} />
        </li>
      ))}
    </ul>
  );
}

export default SessionsList;
