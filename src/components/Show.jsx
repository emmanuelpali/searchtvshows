import { Link } from 'react-router-dom';

const Show = ({ showData }) => {
    return (
        <div className="col-8 col-md-3 mx-auto card shadow" style={{width: "18rem"}}>
            {showData.image ? (
                <img
                    src={showData.image.medium}
                    className="card-img-top"
                    alt={showData.name}
                />
            ) : (
                <img
                    src="https://via.placeholder.com/210x295"
                    className="card-img-top placeholder-img"
                    alt={showData.name}
                />
            )}
            <div className="card-body">
                <h2 className="card-title fs-5">{showData.name}</h2>
                <p className="card-text">Rating: {showData.rating.average}</p>
                <Link to={`/${showData.id}`} className="btn btn-dark">Details</Link>
            </div>
        </div>
    );
};


export default Show;
