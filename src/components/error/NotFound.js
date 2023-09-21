import NotFoundImg from "../../notFound.svg";
import { Link } from "react-router-dom";
import "./NotFound.css";
export default function NotFound() {
    return (
        <div
            className="image-container"
            >
            <img
                className="image-not-found"
                src={NotFoundImg}
                height="340rem"
                alt="not found img"
            />
            <div className="text-button">
                <h3 
              
                >
                    Ops we could not found what are looking for!
                </h3>
                <Link to="/">Home page</Link>
            </div>
        </div>
    );
}
