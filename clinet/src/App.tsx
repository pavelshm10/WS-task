import { useDispatch } from "react-redux";
import NotificationList from "./components/NotificationList";
import { useAppSelector } from "./store";
import { logout } from "./store/reducers/authSlice";
import LoginForm from "./components/LoginForm";

export const App: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <NotificationList />
    </>
  );
};
