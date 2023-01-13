/**
 * @fileoverview your-domain.com/news
 */
import Link from "next/link";
import { Fragment } from "react";

function NewsPage() {
  return (
    <Fragment>
      <h2>The News Page</h2>
      <ul>
        <li>
          <Link href="/news/nextjs-is-a-great-framework">NextJs is a great framework</Link>
        </li>
        <li><a>something</a></li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
