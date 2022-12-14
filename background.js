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
                        "piped.kavin.rocks"
                    ),
                };
        }

        if (hostname === "www.reddit.com" || hostname === "reddit.com")
            return {
                redirectUrl: details.url.replace(
                    hostname,
                    "libreddit.spike.codes"
                ),
            };

        if (hostname === "www.google.com")
            return {
                redirectUrl: details.url.replace(hostname, "search.brave.com"),
            };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
