import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/home";
import WalletPage from "pages/wallet";
import SendPage from "pages/send";
import PrivateRoute from "components/core/PrivateRoute";
import styles from "./App.module.scss";

const App = () => (
  <div className={styles.appContainer}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <WalletPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/send"
          element={
            <PrivateRoute>
              <SendPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
