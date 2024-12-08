import { createContext, ReactNode, useContext, useReducer } from "react";
import { SESSIONS } from "../dummy-sessions";

export type Session = {
  id: string;
  title: string;
  summary: string;
  description: string;
  duration: number;
  date: string;
  image: string;
};

type SessionsContextState = {
  allSessions: Session[];
  upcomingSessions: Session[];
  isOpenModal: boolean;
  modalType: "newSection" | "upcomingSession";
};

type SCProviderProps = {
  children: ReactNode;
};

type SessionsContextValue = SessionsContextState & {
  addSession: (session: Session) => void;
  removeSession: (session: Session) => void;
  openModal: (modalType: "newSection" | "upcomingSession") => void;
  closeModal: () => void;
};

type SessionAction = {
  type: "addSession" | "removeSession";
  payload: Session;
};

type ModalAction = {
  type: "openModal" | "closeModal";
  payload: { type: "newSection" | "upcomingSession"; value: boolean };
};

type Action = SessionAction | ModalAction;

const initialState: SessionsContextState = {
  allSessions: SESSIONS,
  upcomingSessions: [],
  isOpenModal: false,
  modalType: "newSection",
};

const SessionsContext = createContext<SessionsContextValue | null>(null);

export function useSessionsContext() {
  const data = useContext(SessionsContext);

  if (data === null) throw new Error("Unable to load sessions");

  return data;
}

function sessionsReducer(
  state: SessionsContextState,
  action: Action
): SessionsContextState {
  switch (action.type) {
    case "addSession":
      if (state.upcomingSessions.includes(action.payload)) return state;
      return {
        ...state,
        upcomingSessions: [...state.upcomingSessions, action.payload],
      };
    case "removeSession":
      return {
        ...state,
        upcomingSessions: state.upcomingSessions.filter(
          (session) => session.id !== action.payload.id
        ),
      };
    case "openModal":
      return {
        ...state,
        isOpenModal: action.payload.value,
        modalType: action.payload.type,
      };
    case "closeModal":
      return {
        ...state,
        isOpenModal: action.payload.value,
      };
    default:
      return state;
  }
}

export default function SessionsProvider({ children }: SCProviderProps) {
  const [sessionsState, dispatch] = useReducer(sessionsReducer, initialState);

  const data: SessionsContextValue = {
    allSessions: sessionsState.allSessions,
    upcomingSessions: sessionsState.upcomingSessions,
    isOpenModal: sessionsState.isOpenModal,
    modalType: sessionsState.modalType,
    addSession: (session: Session) => {
      dispatch({ type: "addSession", payload: session });
    },
    removeSession: (session: Session) => {
      dispatch({ type: "removeSession", payload: session });
    },
    openModal: (modalType) => {
      dispatch({
        type: "openModal",
        payload: { value: true, type: modalType },
      });
    },
    closeModal: () => {
      dispatch({
        type: "closeModal",
        payload: { value: false, type: "newSection" },
      });
    },
  };

  return (
    <SessionsContext.Provider value={data}>{children}</SessionsContext.Provider>
  );
}
