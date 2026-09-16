import { LoaderFunctionArgs } from 'react-router-dom'
import { api } from './api/api'


export const urlsLoader = async({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    let urlsByDate = url.searchParams.get('urlsByDate')
    let sortBy = url.searchParams.get('sortBy')

    if(!urlsByDate || urlsByDate === null) {
        urlsByDate = 'all'
    }

    if(!sortBy || sortBy === null) {
        sortBy = 'created_at'
    }
    
    try {
        const response = await api.get(`/fetchUrls?urlsByDate=${urlsByDate}&sortBy=${sortBy}`)
        console.log(response.data.urls)
        return response.data.urls

    }catch(err) {
        console.log("Error Occured in the urlsLoader", err)
        throw err
    }
}


export const analysisLoader = async({ request, params } : LoaderFunctionArgs) => {
    const url = new URL(request.url)
    let groupBy = url.searchParams.get('groupBy')

    if(!groupBy || groupBy === null) {
        groupBy = 'hour'
    }
    try {
        const urlId = params.urlId
        const response1 = await api.get(`/analysis/topValues/${urlId}`)
        const response2 = await api.get(`/analysis/clicksOverTime?groupBy=${groupBy}&urlsId=${urlId}`)
        const topValues = response1.data
        const clicksOverTime = response2.data.clicksOverTime 
        return {
            ...topValues,
            clicksOverTime
        } 

    }catch(err) {
        console.log("Error occured in the analysis loader", err)
        throw err
    }
}