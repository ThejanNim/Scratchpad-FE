import { Navigate, Route, Routes } from "react-router";
import SignIn from "./pages/Auth/SignInPage/SignInPage";
import SignUp from "./pages/Auth/SignUpPage/SignUpPage";
import DocumentEditorPage from "./pages/DocumentEditorPage/DocumentEditorPage";
import { SessionProvider } from "./pages/Auth/SessionContext";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import EditorTemplate from "./components/templates/EditorTemplate/EditorTemplate";
import TodoPage from "./pages/TodoPage/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />

      <Route element={<SessionProvider />}>
        <Route path="/" element={<Navigate to="/document" />} />
        <Route element={<EditorTemplate />}>
          <Route path="/document/:id" element={<DocumentEditorPage />} />
          <Route path="/collection/:id">
            <Route index element={<CollectionPage />} />
            <Route path="todo" element={<TodoPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
