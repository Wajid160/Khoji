const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || "https://wajid2912.app.n8n.cloud/webhook/person-finder";

/**
 * Search for a person across LinkedIn, Facebook, and Twitter
 * via the N8N webhook backend.
 */
export const searchPerson = async (searchParams) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchParams),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 404) throw new Error("Service Not Found (404)");
            if (response.status >= 500) throw new Error("Server Error");
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Handle N8N grouped response: { linkedin: [...], facebook: [...], twitter: [...] }
        let result = null;

        if (Array.isArray(data) && data.length > 0 && (data[0].linkedin || data[0].facebook || data[0].twitter)) {
            result = data[0];
        } else if (data && !Array.isArray(data) && (data.linkedin || data.facebook || data.twitter)) {
            result = data;
        }

        if (result) {
            const flatResults = [];

            const transformItem = (item) => {
                const titleParts = item.title ? item.title.split(' - ') : [];
                const name = titleParts[0] || item.title || 'Unknown';

                return {
                    name: name.trim(),
                    title: item.title || '',
                    link: item.link || '',
                    source: item.platform || 'Unknown',
                    description: item.description || 'No description available.',
                    location: item.location || '',
                    confidence: item.confidence || 0
                };
            };

            if (result.linkedin && Array.isArray(result.linkedin)) {
                flatResults.push(...result.linkedin.map(transformItem));
            }
            if (result.facebook && Array.isArray(result.facebook)) {
                flatResults.push(...result.facebook.map(transformItem));
            }
            if (result.twitter && Array.isArray(result.twitter)) {
                flatResults.push(...result.twitter.map(transformItem));
            }

            return flatResults;
        }

        // Handle other response formats
        if (data.results && Array.isArray(data.results)) return data.results;
        if (Array.isArray(data)) return data;
        if (data.data && Array.isArray(data.data)) return data.data;
        return [data];

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error("Request Timeout");
        }
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error("Network/CORS Error");
        }
        throw error;
    }
};
