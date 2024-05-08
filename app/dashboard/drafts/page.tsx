import { DocumentsLayout } from "@/layouts/Documents";

export default async function DashboardDraftsPage() {
  try {
    const filter = "drafts";
    return <DocumentsLayout filter={filter} />;
  } catch (error) {
    console.error("An error occurred in DashboardDraftsPage:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
