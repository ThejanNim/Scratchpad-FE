import { Navigate, Route, Routes } from "react-router";
import SignIn from "./pages/Auth/SignInPage/SignInPage";
import SignUp from "./pages/Auth/SignUpPage/SignUpPage";
import DocumentEditorPage from "./pages/DocumentEditorPage/DocumentEditorPage";
import { SessionProvider } from "./pages/Auth/SessionContext";

function App() {
  return (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route element={<SessionProvider />}>
        <Route path="/" element={<Navigate to="/documents" />} />
        <Route path="/documents/:id" element={<DocumentEditorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
