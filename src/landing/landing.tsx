import { useState } from "react";
import "./landing.css";

export const LandingPage = () => {
    const [urlBlock, setUrlBlock] = useState(false);

    const handleUrlBlock = () => {
        setUrlBlock(true);
    };

    const handleUrlBlockClose = () => {
        setUrlBlock(false);
    };
    return (
        <>
            <Topbar />
            <HeroSection
                urlBlock={urlBlock}
                handleUrlBlock={handleUrlBlock}
                handleUrlBlockClose={handleUrlBlockClose}
            />
            <LandingReportSection />
            <PartnersSection />
            <button className="about-us-btn border-b-2 border-b-(--primary-teal) px-1 pt-1 pb-0.5 w-[30%] mx-auto mt-2 flex justify-center font-semibold text-2xl">
                About us
            </button>
        </>
    );
};

const Topbar = () => {
    return (
        <>
            <div className="landing-topbar">
                <h2>Shortener</h2>
                <p>options</p>
            </div>
        </>
    );
};

const HeroSection = ({
    urlBlock,
    handleUrlBlock,
    handleUrlBlockClose,
}: {
    urlBlock: boolean;
    handleUrlBlock: () => void;
    handleUrlBlockClose: () => void;
}) => {
    return (
        <>
            <div className="hero-section w-[90%] mx-auto">
                <h1 className="w-[80%] text-center mx-auto text-4xl font-extrabold">
                    Shorten links, expand your reach
                </h1>
                {!urlBlock ? (
                    <button
                        className="hero-section-btn text-center mask-auto bg-(--primary-teal) py-2  my-4 w-full text-white rounded border-2 border-[#246B65] text-[1.5em] font-semibold"
                        onClick={handleUrlBlock}
                    >
                        Start for free
                    </button>
                ) : (
                    <UrlBlock handleUrlBlockClose={handleUrlBlockClose} />
                )}
            </div>
        </>
    );
};

const UrlBlock = ({
    handleUrlBlockClose,
}: {
    handleUrlBlockClose: () => void;
}) => {
    return (
        <>
            <div className="url-block">
                <div className="close-btn">
                    <button onClick={handleUrlBlockClose}>close</button>
                </div>
                <div className="url-input-block flex-col justify-center align-middle w-[80%] mx-auto">
                    <input
                        type="text"
                        className="border-2 border-black px-2 py-2 rounded-[0.6rem] w-full mb-2 "
                    />
                    <button className="shorten-url-btn text-center text-white text-1xl font-semibold bg-(--primary-teal) rounded w-[50%] flex justify-center mx-auto my-2 p-2">
                        Shorten Url
                    </button>
                </div>
            </div>
        </>
    );
};

const LandingReportSection = () => {
    return (
        <>
            <div className="landing-report-section flex-col justify-center align-middle w-full mx-auto p-4 bg-(--subtle-gray) my-[2em]">
                <div className="report-block mx-auto text-center mb-4">
                    <h2 className="text-[4em] font-bold mb-0">
                        13m<span className="text-(--primary-teal)">+</span>
                    </h2>
                    <p className="text-[0.8em] mt-0">Redirects per day</p>
                </div>
                <div className="report-block mx-auto text-center mt-4">
                    <h2 className="text-[4em] font-bold">
                        100k<span className="text-(--primary-teal)">+</span>
                    </h2>
                    <p className="text-[0.8em]">Users per day</p>
                </div>
            </div>
        </>
    );
};

const PartnersSection = () => {
    return (
        <>
            <div className="partners-section">
                <h2 className="text-center text-2xl font-semibold mb-3">
                    Trusted worldwide by
                </h2>
                <div className="companies"></div>
                <p className="partner-para text-center mt-3 mb-[1.5em] w-[90%] mx-auto">
                    Brands all over the world find Sham essential for their work
                    process. Sham helps businesses engage a new audience and
                    increase brand recognition.
                </p>
            </div>
        </>
    );
};
