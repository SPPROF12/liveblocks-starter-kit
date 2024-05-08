import { DocumentsLayout } from "@/layouts/Documents";

type Params = {
  groupId: string;
};

export async function getServerSideProps({ params }: { params: Params }) {
  return {
    props: {
      groupId: params.groupId,
    },
  };
}

export default function DashboardGroupPage({ groupId }: Params) {
  return <DocumentsLayout filter="group" groupId={groupId} />;
}
