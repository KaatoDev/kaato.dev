import "../components/styles/pages.scss";

export default function NotFound() {
    return (
        <div className={'_home full flex-center flex-col'}>
            <p className={'_text flex flex-col sm:flex-row mb-[6.5rem] font-bold text-9xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] select-none'}>
                404
            </p>
            <p className={'text-sm opacity-50'}>
                Você será redirecionado para a home em 3 segundos...
            </p>
            <meta httpEquiv={"refresh"} content={"3; url = /"}/>
        </div>
    );
}