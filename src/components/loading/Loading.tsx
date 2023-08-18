import "./loading.css";
export default function Loading() {
    return (
        <div className="container">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
