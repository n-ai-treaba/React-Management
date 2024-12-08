import { createPortal } from "react-dom";
import { type Session, useSessionsContext } from "../../store/sessions-context";
import { ReactNode, useEffect, useRef } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { SESSIONS } from "../../dummy-sessions";

const ModalParentEl = document.getElementById("modal-root")!;

export default function Modal() {
  const {
    isOpenModal,
    modalType,
    upcomingSessions,
    removeSession,
    closeModal,
    addSession,
  } = useSessionsContext();

  const ref = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (isOpenModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpenModal]);

  let ModalContent: ReactNode;

  if (modalType === "newSection") {
    const params = useParams<{ id: string }>();

    const sessionId = params.id;
    const loadedSession = SESSIONS.find((session) => session.id === sessionId);

    function handleNewSessionSubmit(session: Session) {
      addSession(session);
      ref.current?.close();
      closeModal();
    }
    ModalContent = (
      <form method="dialog">
        <Input type="text">Your Name</Input>
        <Input type="email">Your Email</Input>
        <div className={"actions"}>
          <Button onClick={() => handleNewSessionSubmit(loadedSession!)}>
            Submit
          </Button>
        </div>
      </form>
    );
  } else {
    ModalContent = (
      <ul>
        {upcomingSessions.length ? (
          upcomingSessions.map((session) => (
            <li key={session.id} className="upcoming-session">
              <div>
                <h3>{session.title}</h3>
                <p>{session.summary}</p>
                <p>{session.date}</p>
              </div>
              <Button onClick={() => removeSession(session)}>Cancel</Button>
            </li>
          ))
        ) : (
          <li className="upcoming-session">
            <div>
              <h3>You have no sessions</h3>
              <p>Start by adding some!</p>
            </div>
          </li>
        )}
      </ul>
    );
  }

  return createPortal(
    <dialog ref={ref} className="modal">
      <div className="actions">
        <Button className="actions" onClick={() => closeModal()}>
          <RxCross2 />
        </Button>
      </div>
      {ModalContent}
    </dialog>,
    ModalParentEl
  );
}
