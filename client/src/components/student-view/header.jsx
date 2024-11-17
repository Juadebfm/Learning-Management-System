import { GraduationCap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const StudentViewCommonHeader = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Link to="/home">
          <GraduationCap className="h-8 w-8 mr-4 hover:bg-black" />
        </Link>
      </div>
    </header>
  );
};

export default StudentViewCommonHeader;
