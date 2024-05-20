import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import CommentSection from "../../../../components/global/CommentSection";

function DiscussionListView() {
  const router = useRouter();
  const { discussionName, id } = router?.query;
  return (
    <Layout title={discussionName?.replace(/_/g, " ") + "/#" + id} back>
      <CommentSection discussionName={discussionName} discussionId={id} />
    </Layout>
  );
}

export default DiscussionListView;
