import { Suspense } from "react";
import ViewPost from "./ViewPost";

export default function ViewPostPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        class="px-[1rem] md:px-[3rem] lg:px-[8rem] mb-48
             md:mb-0"
      >
        <ViewPost />
      </div>
    </Suspense>
  );
}
