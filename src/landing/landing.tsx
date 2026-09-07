import { useState, useEffect } from "react";
import "./landing.css";
import Close from '../assets/close.svg?react'
import { NavLink } from "react-router-dom";

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
            <NavLink to='/aboutUs'>
                <button className="about-us-btn border-b-2 border-b-(--primary-teal) px-1 pt-1 pb-0.5 w-[30%] mx-auto mt-2 flex justify-center font-semibold text-2xl hover:cursor-pointer hover:pb-1 hover:scale-105 transition-p transition-scale duration-500">
                    About us
                </button>
            </NavLink>
        </>
    );
};

const Topbar = () => {
    return (
        <>
            <div className="flex justify-between mb-4 mt-2 w-[90%] mx-auto landing-topbar align-text-bottom">
                <h2 className="font-extrabold text-2xl">Sham</h2>
                <div className="flex gap-4">
                    <NavLink to='/signUp'><button className="bg-(--primary-teal) py-2 px-3 text-white font-semibold rounded-[0.6rem] hover:cursor-pointer hover:scale-105 transition duration-300">Get started</button></NavLink>
                    <NavLink to='/signIn'><button className="bg-(--charcoal) py-2 px-3 text-white font-semibold rounded-[0.6rem] hover:cursor-pointer hover:scale-105 transition duration-300">Sign In</button></NavLink>
                </div>
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
                        className="start-for-free-btn hero-section-btn text-center mask-auto bg-(--primary-teal) py-2  my-4 w-full text-white rounded border-2 border-[#246B65] text-[1.5em] font-semibold"
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
    const [moved, setMoved] = useState(false)
    useEffect(() => {
        const id = requestAnimationFrame(() => setMoved(true));
        return () => cancelAnimationFrame(id);
    }, [])
    return (
        <>
            <div className={`url-block ${moved ? "url-block--moved" : ""}`}>
                <div className="url-input-block flex-col justify-center align-middle w-[80%] mx-auto mt-4">
                    <div className="flex gap-1">
                        <input
                            type="text"
                            className="border-2 border-black px-2 py-2 rounded-[0.6rem] w-full mb-2 "
                        />
                        <div className="close-btn p-1 bg-(--charcoal) w-10 h-10 rounded-[0.6rem] text-white" onClick={handleUrlBlockClose}>
                            <Close className='w-8 h-8'/>
                        </div>
                    </div>
                    <button className="shorten-url-btn hover:opacity-90 transition duration-300 hover:cursor-pointer text-center text-white text-1xl font-semibold bg-(--primary-teal) rounded-[0.6rem] w-[50%] flex justify-center mx-auto my-2 p-2">
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
