import Skeleton from 'react-loading-skeleton'

export default function MainProfileSkeleton() {
    return (
        <div className="px-5 flex flex-col gap-3 min-h-[100vh] h-full text-white bg-[#323741]">
            <section className="max-h-[200px] h-[25vh]">
                <div className="grid grid-cols-12 h-full">
                    <div className="col-span-2 flex flex-col justify-center items-center">
                        <Skeleton circle width={100} height={100}/>
                    </div>
                    <div className="col-span-7 mt-[-10px] p-5 flex flex-col justify-center">
                        <Skeleton width={200} height={60}/>
                    </div>
                    <div className="col-span-3 flex flex-col justify-center items-center">
                        <Skeleton width={150} height={50}/>
                    </div>
                </div>
                <div></div>
            </section>
            <section>
                <div>
                    <Skeleton width={750} height={80}/>
                </div>
            </section>
            <section className="flex flex-row gap-20">
                <div>
                    <Skeleton width={175} height={40} />
                </div>
                <div>
                    <Skeleton width={115} height={40} />
                </div>
            </section>
            <section>
                <Skeleton width={500} height={60}/>
            </section>
            <section>
                <Skeleton width={850} height={300} />
            </section>
        </div>
    )
}