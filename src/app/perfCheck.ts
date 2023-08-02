
export function perfCheck() {
    const id = 'asd'
    const observer = new PerformanceObserver((list) => {
        const requests = list.getEntries().filter((entry)=> !entry.name.includes("/api"));

        if (requests.length > 0) {
            fetch('/api/requests',{body:JSON.stringify({id, requests}),method: 'PUT'})
        }
    });

    observer.observe({ type: "resource", buffered: true });
}