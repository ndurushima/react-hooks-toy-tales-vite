export async function fetcher(url, options = {}) {
    const defaultHeaders = {
        "Content-Type": "application/json",
    }

    const config = {
        headers: defaultHeaders,
        ...options
    }

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error("failed to complete request")
        }
        if (response.status !== 204) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}