import React from "react";
import CakeList from "../components/CakeList";
import PostCakes from "../components/PostCakes";

function AdminCakePage() {
  return (
    <div>
      <PostCakes />
      <CakeList />
    </div>
  );
}
export default AdminCakePage;
