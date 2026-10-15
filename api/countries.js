
module.exports = async function (req, res) {
    try {
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            return res.status(500).json({
                error: "API_KEY is not configured on the server."
            });
        }

        // Read the requested API path, if any
        const { path, ...params } = req.query;

        const apiPath = path
            ? "/" + path.split("/").map(encodeURIComponent).join("/")
            : "";

        const url = new URL(
            `https://api.restcountries.com/countries/v5${apiPath}`
        );

        // Forward the remaining query parameters
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === "string") {
                url.searchParams.set(key, value);
            }
        }

        // Call REST Countries using the server-side key
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        const data = await response.text();

        res.status(response.status);
        res.setHeader(
            "Content-Type",
            response.headers.get("content-type") || "application/json"
        );

        return res.send(data);

    } catch (error) {
        console.error("API request failed:", error);

        return res.status(500).json({
            error: "Unable to retrieve country data."
        });
    }
};