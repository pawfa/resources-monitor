import {getPerformanceSessions} from "@/app/api/performanceEntriesApi";
import {Dashboard} from "@/app/Dashboard";

export default async function Home() {
    const performanceSessions = await getPerformanceSessions()

    return (
            <Dashboard performanceSessions={performanceSessions}/>
    )
}
