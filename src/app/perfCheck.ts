onload = (event) => {
    perfCheck()
};
export function perfCheck() {
    const userId = 'id';
    const sessionId = crypto.randomUUID();
    const sessionTimestamp = Date.now()
    const observer = new PerformanceObserver((list) => {
        const requests = list.getEntries().filter((entry)=> !entry.name.includes("/api"));

        if (requests.length > 0) {
            fetch('/api/requests',{body:JSON.stringify({userId,sessionId, sessionTimestamp, requests}),method: 'PUT'})
        }
    });

    observer.observe({ type: "resource", buffered: true });
}