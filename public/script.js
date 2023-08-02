window.onload = (event) => {
    performance()
}

function performance() {
    const id = 'asd'
    const observer = new PerformanceObserver((list) => {
        const requests = list.getEntries().filter((entry)=> !entry.name.includes("/api"));

        if (requests.length > 0) {
            fetch('/api/measures',{body:JSON.stringify({id, data: requests}),method: 'PUT'})
        }
    });

    observer.observe({ type: "resource", buffered: true });
}