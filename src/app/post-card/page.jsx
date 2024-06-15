import { Suspense } from "react";
import ViewPost from "./ViewPost";

export default function ViewPostPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div class="px-[8rem]">
                <ViewPost />
            </div>
        </Suspense>
    )
}