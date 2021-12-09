import firebase from "./FirebaseManager"

// downloadHandler
const downloadHandler = (fileName = "") => {
    return new Promise((resolve, reject) => {
        const storage = firebase.storage
        firebase.getDownloadURL(firebase.ref(storage, fileName))
            .then(url => {
                resolve(url)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export default { downloadHandler }