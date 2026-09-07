
const topLocations = [
  { country: "United States", visits: 4820 },
  { country: "India", visits: 3190 },
  { country: "Germany", visits: 1745 },
  { country: "United Kingdom", visits: 1502 },
  { country: "Brazil", visits: 980 },
];


const topReferrers = [
  { source: "google.com", visits: 5230 },
  { source: "twitter.com", visits: 1420 },
  { source: "direct", visits: 980 },       // handle NULL referrer as "direct"
  { source: "linkedin.com", visits: 640 },
  { source: "reddit.com", visits: 310 },
];

const deviceBreakdown = [
  { device: "Desktop", visits: 6200, percentage: 58.4 },
  { device: "Mobile", visits: 3900, percentage: 36.8 },
  { device: "Tablet", visits: 510, percentage: 4.8 },
];

const browserBreakdown = [
  { browser: "Chrome", visits: 5840, percentage: 55.1 },
  { browser: "Safari", visits: 2310, percentage: 21.8 },
  { browser: "Firefox", visits: 980, percentage: 9.2 },
  { browser: "Edge", visits: 720, percentage: 6.8 },
  { browser: "Other", visits: 760, percentage: 7.1 },
];


export const AnalyticsPage = () => {
    return (
        <>
        <div className="analytics w-full">
            <h2 className="text-center text-2xl font-extrabold my-3">Url Analytics</h2>
            <div className="clicks-graph">

            </div>
            <div className="grid grid-cols-2 w-[90%] mx-auto gap-4">
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Top Referrers</h3>
                    {topReferrers.map((i) => {
                        const { source, visits } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{source}</p>
                                <p>{visits}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Locations</h3>
                    {topLocations.map((i) => {
                        const { country, visits } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{country}</p>
                                <p>{visits}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Devices</h3>
                    {deviceBreakdown.map((i) => {
                        const { device, visits } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b pb-3">
                                <p>{device}</p>
                                <p>{visits}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Browser</h3>
                    {browserBreakdown.map((i) => {
                        const { browser, visits } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{browser}</p>
                                <p>{visits}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}