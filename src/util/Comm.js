function PostToContent(data = null) {
    if (data == null)
        return

    window.postMessage(data, '*')
}

// {msg:cb}
function registerCB({ type = "", callback = null }) {
    console.log(type)
    window.addEventListener("message", (evt) => {
        switch (evt.data.type) {
            case type:
                if (callback)
                    callback(evt.data)
                break;
            default:
                break;
        }
    })
}

export { PostToContent, registerCB }