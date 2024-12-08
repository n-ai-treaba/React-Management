import { Outlet } from "react-router-dom";
import Header from "../Components/ui/Header";
import Modal from "../Components/Modal/Modal";

export default function Root() {
  return (
    <>
      <Header />
      <Modal />
      <Outlet />
    </>
  );
}
