function PostToContent() {
    var data = {
        type: "FROM_OOLETSITE_REQ",
    };
    window.postMessage(data, '*')
}

function registerCB({ callback = null }) {
    window.addEventListener("message", (evt) => {
        switch (evt.data.type) {
            case "FROM_EXTENSION":
                if (callback)
                    callback(evt.data)
                break;
            default:
                break;
        }
    })
}

export { PostToContent, registerCB }