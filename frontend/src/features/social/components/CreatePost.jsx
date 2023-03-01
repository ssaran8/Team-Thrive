import {useState} from "react";


export const CreatePost = (uid) => {

    const [postText, setText] = useState('')

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async () => {
        console.log("Starts submission")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: 'FzBdGVh1flYAoJjtoKAhD0LIsIF3',
                post: "postText",
            })
        }
        fetch('http://localhost:4567/createPost', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }

    return (
        <div>
            <input type="text" onChange={handleChange} value={postText}/>
            <input type="submit" value="Post" onClick={handleSubmit}/>
        </div>
    )

}

