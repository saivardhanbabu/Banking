import { Outlet } from "react-router-dom";
import Header from './components/header/Header'

function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "70vh" }}>
        <div className="container-fluid">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;