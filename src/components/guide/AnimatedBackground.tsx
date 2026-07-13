export default function AnimatedBackground() {

    return (

        <>

            {/* Grid */}

            <div
                className="
                absolute
                inset-0
                opacity-[0.08]
                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                bg-[size:60px_60px]
                "
            />

            {/* Blob 1 */}

            <div
                className="
                absolute
                top-[-180px]
                left-[-150px]
                h-[420px]
                w-[420px]
                rounded-full
                bg-blue-400/30
                blur-3xl
                animate-blob
                "
            />

            {/* Blob 2 */}

            <div
                className="
                absolute
                right-[-180px]
                top-[120px]
                h-[450px]
                w-[450px]
                rounded-full
                bg-cyan-300/30
                blur-3xl
                animate-blob
                animation-delay-2000
                "
            />

            {/* Blob 3 */}

            <div
                className="
                absolute
                bottom-[-200px]
                left-1/3
                h-[500px]
                w-[500px]
                rounded-full
                bg-indigo-500/20
                blur-3xl
                animate-blob
                animation-delay-4000
                "
            />

        </>

    );

}