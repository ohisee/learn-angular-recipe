/**
 * This is dynamic file path
 * 
 * @fileoverview your-domain.com/news/something-important
 */
import { useRouter } from "next/router";

function DetailPage() {

  const router = useRouter();

  const newsId = router.query['newsId'];

  console.log(newsId);

  return (
    <h2>The Detail Page</h2>
  );
}

export default DetailPage;
