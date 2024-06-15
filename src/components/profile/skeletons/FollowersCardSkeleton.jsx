import Skeleton from 'react-loading-skeleton'

export default function FollowersCardSkeleton() {
    return (
        <div className="bg-[#323741] text-white rounded-[30px] mx-5 my-5">
            <section className='flex flex-row justify-center pt-[20px]'>
                <div><Skeleton width={250} height={40} /></div>
            </section>

            <div className="h-[20px]"></div>

            <section className="flex flex-row justify-center">
                <div><Skeleton width={275} height={50} /></div>
            </section>

            <div className="h-[2px] my-3 bg-[#838d9e]"></div>

            <section className="text-lg h-[300px]">
                <div className="p-2 flex flex-row gap-4">
                    <div className="ml-2">
                        <Skeleton circle width={40} height={40} />
                    </div>
                    <div className="flex flex-col justify-center text-lg">
                        <Skeleton width={200} />
                    </div>
                </div>
                <div className="p-2 flex flex-row gap-4">
                    <div className="ml-2">
                        <Skeleton circle width={40} height={40} />
                    </div>
                    <div className="flex flex-col justify-center text-lg">
                        <Skeleton width={200} />
                    </div>
                </div>
                <div className="p-2 flex flex-row gap-4">
                    <div className="ml-2">
                        <Skeleton circle width={40} height={40} />
                    </div>
                    <div className="flex flex-col justify-center text-lg">
                        <Skeleton width={200} />
                    </div>
                </div>
            </section>
        </div>
    )
}