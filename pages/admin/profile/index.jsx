
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { getUser } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ProfileMain } from "../../organization/profile";
function Index() {
  const [fetch, setFetch] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch, fetch]);
  return (
    <Layout title="Profile Settings">
      <ProfileMain user={user} setFetch={setFetch} />
    </Layout>
  );
}
export default Index;
