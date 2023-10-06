//

import React from "react";
import { Outlet } from "react-router-dom";

export default function LandingPageLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
