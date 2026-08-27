export default function AnimatedBackground() {

    return (

        <>

            {/* Grid */}

            <div
                className="
                absolute
                inset-0
                opacity-[0.045]
                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                bg-[size:60px_60px]
                "
            />

                <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(110deg,transparent_20%,rgba(125,211,252,0.12)_42%,transparent_64%)] bg-[length:220%_100%] animate-background-shimmer" />

                <div className="pointer-events-none absolute left-[18%] top-[28%] h-64 w-64 rounded-full bg-cyan-300/10 blur-[100px] animate-background-drift" />

                <div className="pointer-events-none absolute bottom-[18%] right-[12%] h-80 w-80 rounded-full bg-blue-300/10 blur-[120px] animate-background-drift-reverse" />

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