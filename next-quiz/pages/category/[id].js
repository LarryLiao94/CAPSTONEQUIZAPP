import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default-layout";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <p>Show the category id : {id}</p>
    </DefaultLayout>
  );
};

export default CategoryPage;
