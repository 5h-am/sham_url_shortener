import { NavLink, useLoaderData, useRevalidator, useSearchParams } from "react-router-dom";
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AxiosError } from "axios";
import { api } from '../api/api'
import DeleteIcon from '../assets/delete.svg?react'

type urlShortenerDataType = {
    id: string,
    urls_code: string,
    original_url: string,
    created_at: string,
    totalclicks: string,
    grouped_by?: string
}


export const MyLinks = () => {

	const [shortUrlBlock, setShortUrlBlock] = useState(false)
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrlError, setShortUrlError] = useState('')
    const [shortUrl, setShortUrl] = useState('')
	const { revalidate } = useRevalidator()
    const urlShortenerData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams({ urlsByDate: 'all', sortBy: "created_at"})

    const handleOriginalUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOriginalUrl(e.target.value)
    }

    const handleUrlsByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            newParams.set('urlsByDate', e.target.value)
            return newParams
        })    
    }

    const handleSortBy = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)
            newParams.set('sortBy', e.target.value)
            return newParams
        })     
    }

    const handleDelete = async(e:React.MouseEvent<HTMLDivElement>, urlId: string) => {
        e.stopPropagation()
        try{
            const response = await api.get(`/urlDelete/${urlId}`)
            if(response.status === 200) {
                toast.success("Url Deleted Successfully")
                revalidate()
            }
        }catch(err) {
            console.log("Failure occured while deleting the url", err)
            toast.error("Could not delete the url, try again later")
        }
    }


    const handleUrlShortening = async() => {
        try {
            if(originalUrl === '') {
                setShortUrlError("Can't leave the original url empty")
            }
            const response = await api.post(`/protected/urlShortener`, {originalUrl : originalUrl})
            if(response.status === 200) {
                setShortUrl(response.data.url)
                setShortUrlBlock(true)
                setShortUrlError('')
				revalidate()
                toast.success("Url Shortened Successfully", { duration: 3000})              
            }

        }catch(err) {
            console.log("Error occurred while signing in:", err);

            if (err instanceof AxiosError && !err.response) {
                setShortUrlError("Unable to connect to the server")           
            }

            const errStatus = err instanceof AxiosError ? err.response?.status : "Unknown"

            switch (errStatus) {
                case 400:
                    setShortUrlError("Please enter a valid url")
                    break

                case 429:
                    setShortUrlError("Too many forget password attempt. Please try again later.")
                    break

                case 500:
                    setShortUrlError("Internal Server Error.")
                    break

                default:
                    setShortUrlError("Something went wrong")
                    break;
            }
        }
    }

    const handleShortUrlBlockClose = () => {
        setShortUrlBlock(false)
    }

    return (
        <>
        <div className="w-full">
            {!shortUrlBlock ? <div className="w-[70%] mx-auto  flex flex-col mt-8 rounded-[0.6rem] py-5 px-6">
                <input type="text" className="w-[80%] border-2 py-1 px-1 mx-auto mb-3 rounded" placeholder="Paste or enter a link to shorten" onChange={handleOriginalUrlInput} />
				{shortUrlError && <p className="text-red-500 ms-4">{shortUrlError}</p>}
                <button className="bg-(--primary-teal) max-w-30 w-full py-1 px-2 rounded hover:cursor-pointer hover:opacity-80 transition-opacity duration-500 mx-auto flex justify-center" onClick={handleUrlShortening}>Shorten Url</button>
            </div>
			:
			<div className="w-[70%] mx-auto  flex flex-col mt-8 rounded-[0.6rem] py-5 px-6">
				<p className="text-green-400 text-center">Email shortened successfully</p>
				<p className="text-center underline text-blue-500">{shortUrl}</p>
				<button className="bg-(--primary-teal) max-w-30 w-full py-1 px-2 rounded hover:cursor-pointer hover:opacity-80 transition-opacity duration-500 mx-auto flex justify-center" onClick={handleShortUrlBlockClose}>Confirm</button>
			</div>
			}

            <div className="filter-selects flex justify-between w-[93%] mx-auto">
                <select name="createdAt" id="createdAt" className="rounded-[0.4rem] p-1 py-2 bg-(--accent-mint)" onChange={handleUrlsByDate}>
                    <option value="day">Last 24 hours</option>
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="all">All</option>
                </select>
                <select name="sortBy" id="sortBy" className="rounded-[0.4rem] p-2 bg-(--accent-mint)" onChange={handleSortBy}>
                    <option value="created_at">Created At</option>
                    <option value="totalClicks">Clicks</option>
                </select>
            </div>
            <div className="my-links overflow-y-auto min-[800px]:h-[70vh]">
                {urlShortenerData.map((i: urlShortenerDataType) => {
                    const {id, urls_code, original_url, created_at,  totalclicks} = i
                    return (
                        <NavLink to={`analysis/${id}`}>
                            <div key={id} className="w-[93%] mx-auto mt-4 flex justify-between items-baseline gap-4">
                                <div>
                                    <p className="text-(--primary-teal)">{import.meta.env.VITE_BACKEND_URL.replace('/api/v1', '/') + urls_code}</p>
                                    <p className="text-[10px] underline text-gray-500 w-[70%]">{original_url}</p>
                                </div>
                                <div className="flex flex-col text-[0.8em]">
                                    <div className="flex">
                                        <p className="self-center">{totalclicks} clicks</p>
                                        <div className="delete-icon w-8 h-8 align-baseline text-gray-300" onClick={(e) => handleDelete(e, id)}>
                                            <DeleteIcon className="w-8 h-8"/>
                                        </div>
                                    </div>
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