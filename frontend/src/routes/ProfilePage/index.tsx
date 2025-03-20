import {useParams} from "react-router-dom";

export default function ProfilePage() {
    const {userId} = useParams(); // Change 'user' to 'userId'

    return (
        <div>
            <h1>Profile Page</h1>
            <p>This is the profile page for user ID: {userId}</p>
        </div>
    );
}
