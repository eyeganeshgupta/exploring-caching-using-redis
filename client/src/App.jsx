import { useCallback, useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import UserList from "./components/UserList";

const API_URL = "http://localhost:8086/users/lists";

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // if (loading) return <LoadingSpinner />;
  // if (error) return <ErrorMessage message={error} />;
  if (users?.length === 0)
    return <h2 className="text-center mt-5">No users in the database</h2>;

  return (
    <div className="container-fluid d-flex flex-column vh-100 p-0 justify-content-center align-items-center">
      <div
        className="w-100 max-w-1200 px-4 d-flex flex-column"
        style={{ height: "100%" }}
      >
        <h2 className="text-center py-4">🕵 Exploring Caching using REDIS</h2>
        <div className="flex-grow-1">
          {loading && <LoadingSpinner />}
          <UserList users={users} />
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default App;
