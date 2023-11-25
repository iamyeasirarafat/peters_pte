import Layout from "@/components/Layout";
import { useRouter } from "next/router";

function DiscussionListView() {
  const router = useRouter();
  console.log(router?.query);
  const { discussionName, id } = router?.query;
  return (
    <Layout title={discussionName?.replace(/_/g, " ") + "/" + id} back>
      <p>{discussionName + "/" + id}</p>
    </Layout>
  );
}

export default DiscussionListView;
