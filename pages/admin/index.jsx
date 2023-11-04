import AdminLayout from "@/components/AdminLayout";
import Glance from "@/components/Glance";
import Students from "@/components/Products";
import TablePagination from "@/components/TablePagination";
const studentsList = [
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "85",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "70",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "60",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "50",
    group: "Dhaka Branch",
  },
  {
    name: "Eshak khan",
    image: "/images/product-pic-1.jpg",
    accountPlan: "Premium",
    userId: "tusha789",
    lastLoggedIn: "05/07/23",
    averageScore: "79",
    group: "Dhaka Branch",
  },
];
const Index = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="">
        <p className="text-lg font-extrabold mb-2">At a Glance</p>
        <Glance />
      </div>
      <div className="mt-10">
        <p className="text-lg font-extrabold mb-2">Recently Joined</p>
        <Students student={false} items={studentsList} />
        <TablePagination />
      </div>
    </AdminLayout>
  );
};

export default Index;
