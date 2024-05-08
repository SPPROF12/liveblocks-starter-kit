import * as DashboardSidebar from "./DashboardSidebar";
import * as DashboardHeader from "./DashboardHeader";

const dashboardExports = {
  ...DashboardSidebar,
  ...DashboardHeader,
};

export default dashboardExports;


import dashboardExports from "./dashboardExports";

// Use the named exports like this:
dashboardExports.DashboardSidebar.someNamedExport();
dashboardExports.DashboardHeader.anotherNamedExport();
