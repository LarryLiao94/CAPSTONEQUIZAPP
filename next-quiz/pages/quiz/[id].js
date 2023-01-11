import { useRouter } from "next/router";
import DefaultLayout from "../../components/layouts/default-layout";

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DefaultLayout>
      <p>Show the Quiz id : {id}</p>
    </DefaultLayout>
  );
};

export default QuizPage;
