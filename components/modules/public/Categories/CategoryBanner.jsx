import react from 'react'

export default function CategoryBanner() {
    return (
        <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        All Categories
                    </h1>
                    <p className="text-white/80 text-lg">
                        We&apos;re on a mission to make quality products accessible to
                        everyone, everywhere.
                    </p>
                </div>
            </div>
        </section>
    );
}
