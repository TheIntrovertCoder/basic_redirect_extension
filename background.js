let browser = () => {
    return typeof chrome === undefined ? browser : chrome;
};

browser().webRequest.onBeforeRequest.addListener(
    (details) => {
        const youtube_links = [
            "youtu.be",
            "youtube.com",
            "www.youtube.com",
            "www.youtube-nocookie.com",
        ];

        let hostname = details.url.split("/")[2];

        for (let i = 0; i <= youtube_links.length - 1; i++) {
            if (hostname === youtube_links[i])
                return {
                    redirectUrl: details.url.replace(
                        hostname,
                        "inv.nadeko.net"
                    ),
                };
        }

        if (hostname === "www.reddit.com" || hostname === "reddit.com")
            return {
                redirectUrl: details.url.replace(
                    hostname,
                    "redlib.nadeko.net"
                ),
            };

        if (hostname === "www.google.com" || hostname === "google.com")
            return {
                redirectUrl: details.url.replace(hostname, "search.brave.com"),
            };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
