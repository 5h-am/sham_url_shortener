import { useLoaderData, useSearchParams } from "react-router-dom"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts"

type topReferrersDataType = {
    referrer: string,
    count: string
}

type topCountriesDataType = {
    country: string,
    count: string
}

type topDevicesDataType = {
    device: string,
    count: string
}

type topBrowsersDataType = {
    browser: string,
    count: string
    
}


export const AnalyticsPage = () => {

    const analysisData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams({
        groupBy: 'hour'
    })

    const handleGroupBy = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ groupBy: e.target.value})

    }
    const { topBrowsers, topCountries, topReferrers, topDevices, clicksOverTime } = analysisData
    return (
        <>
        <div className="analytics w-full overflow-y-auto h-[99vh]">
            <h2 className="text-center text-2xl font-extrabold my-3">Url Analytics</h2>
            <div className="clicks-graph border-2 border-gray-500 rounded-[0.6rem] w-[90%] mx-auto mb-4">
                <div className="flex justify-between my-3 mx-3 items-baseline">
                    <h2 className="font-bold text-1xl">Clicks Over time</h2>
                    <select name="createdAt" id="createdAt" className="rounded-[0.4rem] p-1 py-1 bg-(--accent-mint)" onChange={handleGroupBy}>
                        <option value="hour">Last 1 hour</option>
                        <option value="day">Last 24 hours</option>
                        <option value="week">Last 7 days</option>
                        <option value="month">Last 30 days</option>
                        <option value="year">Last 365 days</option>
                    </select>
                </div>
                <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600, marginInline: 'auto'}} responsive data={clicksOverTime}>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <Line dataKey="click_count" name="Clicks Over Time" stroke="#349c94" dot={{ fill: '#1e293b', r: 4 }}  />
                    <XAxis dataKey="grouped_by" tick={false} />
                    <YAxis width="auto" label={{ value: 'Count', position: 'insideLeft', angle: -90 }}/>
                    <Tooltip />
                </LineChart>
            </div>
            <div className="grid grid-cols-2 w-[90%] mx-auto gap-4">
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Top Referrers</h3>
                    {topReferrers.map((i: topReferrersDataType) => {
                        const { referrer, count } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{referrer || 'Unknown'}</p>
                                <p>{count || "0"}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Locations</h3>
                    {topCountries.map((i : topCountriesDataType) => {
                        const { country, count } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{country || 'Unknown'}</p>
                                <p>{count || "0"}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Devices</h3>
                    {topDevices.map((i: topDevicesDataType) => {
                        const { device, count } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b pb-3">
                                <p>{device || 'Unknown'}</p>
                                <p>{count || "0"}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="bg-(--accent-mint) py-4 px-2 rounded-2xl flex flex-col justify-between">
                    <h3 className="w-[95%] mx-auto text-[1.1em] font-extrabold">Browser</h3>
                    {topBrowsers.map((i: topBrowsersDataType) => {
                        const { browser, count } = i
                        return (
                            <div className="flex justify-between w-[95%] mx-auto border-gray-300 border-b py-2">
                                <p>{browser || 'Unknown'}</p>
                                <p>{count || "0"}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}