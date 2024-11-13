import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import React, { useContext } from "react";

const StudentHomePage = () => {
  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <div>
      <h1>Student</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default StudentHomePage;
