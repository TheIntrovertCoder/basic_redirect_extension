let browser = () => {
    return typeof chrome === undefined ? browser : chrome;
};

browser().webRequest.onBeforeRequest.addListener(
    (details) => {

        let youtube_links = [
            "youtu.be",
            "www.youtube.com",
            "www.youtube-nocookie.com",
        ];

        let hostname = details.url.split("/")[2];

        // TODO: Make GUI to let users select their prefered instances
        for (let i = 0; i <= youtube_links.length - 1; i++) {
            if (hostname === youtube_links[i])
                return {
                    redirectUrl: details.url.replace(
                        hostname,
                        "piped.kavin.rocks"
                    ),
                };
        }

        if (hostname === "www.reddit.com")
            return {
                redirectUrl: details.url.replace(
                    hostname,
                    "libreddit.spike.codes"
                ),
            };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
