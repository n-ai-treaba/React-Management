import SessionsList from "../Components/Sessions/SessionsList";
import { useSessionsContext } from "../store/sessions-context";

export default function SessionsPage() {
  const { allSessions } = useSessionsContext();

  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      {/* Todo: Output list of sessions */}
      <SessionsList sessions={allSessions} />
    </main>
  );
}
