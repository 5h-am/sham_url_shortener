import { NavLink } from "react-router-dom";


const urlShortenerData = [
  {
    id: 1,
    short_url: "sho.rt/a1B2c3",
    original_url: "https://www.amazon.com/deals/summer-sale-2026",
    created_at: "2026-01-12T09:14:22.000Z",
    state: "active",
    total_clicks: 1284
  },
  {
    id: 2,
    short_url: "sho.rt/x9Y8z7",
    original_url: "https://www.linkedin.com/in/johndoe-marketing",
    created_at: "2026-01-15T14:02:10.000Z",
    state: "active",
    total_clicks: 342
  },
  {
    id: 3,
    short_url: "sho.rt/qW3rTy",
    original_url: "https://github.com/facebook/react/pull/28934",
    created_at: "2026-02-01T08:45:00.000Z",
    state: "inactive",
    total_clicks: 57
  },
  {
    id: 4,
    short_url: "sho.rt/mN4oPq",
    original_url: "https://www.nytimes.com/2026/02/10/technology/ai-regulation.html",
    created_at: "2026-02-10T11:20:33.000Z",
    state: "active",
    total_clicks: 8921
  },
  {
    id: 5,
    short_url: "sho.rt/zZ1xCv",
    original_url: "https://docs.google.com/spreadsheets/d/1aBcD3fGh",
    created_at: "2026-02-14T16:55:47.000Z",
    state: "active",
    total_clicks: 12
  },
  {
    id: 6,
    short_url: "sho.rt/pL5kJh",
    original_url: "https://www.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    created_at: "2026-03-01T19:30:05.000Z",
    state: "inactive",
    total_clicks: 763
  },
  {
    id: 7,
    short_url: "sho.rt/tR7eWq",
    original_url: "https://www.instagram.com/p/C9Kj3lmnop",
    created_at: "2026-03-05T12:00:00.000Z",
    state: "active",
    total_clicks: 45102
  },
  {
    id: 8,
    short_url: "sho.rt/vB2nMk",
    original_url: "https://www.coursera.org/learn/machine-learning",
    created_at: "2026-03-18T07:10:19.000Z",
    state: "active",
    total_clicks: 2556
  },
  {
    id: 9,
    short_url: "sho.rt/gH8jKl",
    original_url: "https://www.reddit.com/r/programming/comments/xyz123",
    created_at: "2026-03-22T21:44:38.000Z",
    state: "inactive",
    total_clicks: 189
  },
  {
    id: 10,
    short_url: "sho.rt/dF3sAq",
    original_url: "https://www.airbnb.com/rooms/98765432",
    created_at: "2026-04-02T10:05:52.000Z",
    state: "active",
    total_clicks: 934
  },
  {
    id: 11,
    short_url: "sho.rt/eR6tYu",
    original_url: "https://stackoverflow.com/questions/12345678/how-to-center-a-div",
    created_at: "2026-04-09T15:33:27.000Z",
    state: "active",
    total_clicks: 15720
  },
  {
    id: 12,
    short_url: "sho.rt/wS2xZa",
    original_url: "https://www.netflix.com/title/81234567",
    created_at: "2026-04-15T20:12:41.000Z",
    state: "inactive",
    total_clicks: 3401
  },
  {
    id: 13,
    short_url: "sho.rt/kL9pOi",
    original_url: "https://medium.com/@techwriter/scaling-microservices-2026",
    created_at: "2026-05-03T09:00:00.000Z",
    state: "active",
    total_clicks: 621
  },
  {
    id: 14,
    short_url: "sho.rt/uY4hGf",
    original_url: "https://www.zillow.com/homedetails/123-Main-St",
    created_at: "2026-05-11T13:47:59.000Z",
    state: "active",
    total_clicks: 88
  },
  {
    id: 15,
    short_url: "sho.rt/bN7mVc",
    original_url: "https://twitter.com/elonmusk/status/1234567890",
    created_at: "2026-05-20T18:25:14.000Z",
    state: "active",
    total_clicks: 102845
  },
  {
    id: 16,
    short_url: "sho.rt/cX1zLk",
    original_url: "https://www.udemy.com/course/complete-python-bootcamp",
    created_at: "2026-06-02T06:58:03.000Z",
    state: "inactive",
    total_clicks: 47
  },
  {
    id: 17,
    short_url: "sho.rt/jK5qWe",
    original_url: "https://www.figma.com/file/abc123/Design-System",
    created_at: "2026-06-14T11:11:11.000Z",
    state: "active",
    total_clicks: 1003
  },
  {
    id: 18,
    short_url: "sho.rt/hG8dSa",
    original_url: "https://www.wikipedia.org/wiki/Large_language_model",
    created_at: "2026-07-01T08:30:45.000Z",
    state: "active",
    total_clicks: 9876
  },
  {
    id: 19,
    short_url: "sho.rt/fD2rTy",
    original_url: "https://www.bbc.com/news/world-europe-67890123",
    created_at: "2026-07-19T17:02:30.000Z",
    state: "active",
    total_clicks: 4532
  },
  {
    id: 20,
    short_url: "sho.rt/aQ6wEr",
    original_url: "https://www.etsy.com/shop/handmadecrafts123",
    created_at: "2026-08-05T14:40:00.000Z",
    state: "inactive",
    total_clicks: 15
  }
];


export const MyLinks = () => {
    return (
        <>
        <div className="w-full">
            <div className="w-[70%] mx-auto  flex flex-col mt-8 rounded-[0.6rem] py-5 px-6">
                <input type="text" className="w-[80%] border-2 py-1 px-1 mx-auto mb-3 rounded" placeholder="Paste or enter a link to shorten" />
                <button className="bg-(--primary-teal) max-w-30 w-full py-1 px-2 rounded hover:cursor-pointer hover:opacity-80 transition-opacity duration-500 mx-auto flex justify-center">Shorten Url</button>
            </div>

            <div className="filter-selects flex justify-between w-[95%] mx-auto">
                <select name="createdAt" id="createdAt" className="rounded-[0.4rem] p-1 py-2 bg-(--accent-mint)">
                    <option value="1">Last 24 hours</option>
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="all">All</option>
                </select>
                <select name="state" id="state" className="rounded-[0.4rem] p-2 bg-(--accent-mint)">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select name="sortBy" id="sortBy" className="rounded-[0.4rem] p-2 bg-(--accent-mint)">
                    <option value="createdAt">Created At</option>
                    <option value="totalClicks">Clicks</option>
                </select>
            </div>
            <div className="my-links overflow-y-auto min-[800px]:h-[70vh]">
                {urlShortenerData.map((i) => {
                    const {id, short_url, original_url, created_at, state, total_clicks} = i
                    return (
                        <NavLink to={`analysis/${id}`}>
                            <div key={id} className="w-[90%] mx-auto mt-4">
                                <div>
                                    <p className="text-(--primary-teal)">{short_url}</p>
                                    <p className="mt-1 text-xs underline">{original_url}</p>
                                </div>
                                <div className="flex justify-between items-baseline mt-2 text-[0.8em]">
                                    <p>{total_clicks}</p>
                                    <p>{state.toUpperCase()}</p>
                                    <p>{created_at.slice(0,10)}</p>   
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>

        </div>
        </>
    )
}