import "../../../components/styles/pages.scss";

export default function Home() {
    return (
        <div className={'_home full flex-center'}>
            <p className={'_text flex flex-col sm:flex-row mb-[6.5rem] font-bold text-9xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem]'}>
                {['Kaa', 'Dev'].map((it, i) => (
                    <span key={i}>{it}</span>
                ))}
            </p>
        </div>
    );
}