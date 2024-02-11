import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Details = () => {
    const id = useParams().id;
    const singleUrl = `https://api.tvmaze.com/shows/${id}`;
    const [showData, setShowData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let cancelRequest = false;

        setLoading(true);
        setError(null);

        axios
            .get(singleUrl)
            .then((res) => {
                if (!cancelRequest) {
                    setShowData(res.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
                setError('An error occurred while fetching data. Please try again later.');
                setShowData({}); // Clear data on error to avoid showing stale data
            });

        return () => {
            cancelRequest = true;
        };
    }, [singleUrl]);
    if (loading) {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2 className="card-title">...</h2>
                            <p className="card-text">...</p>
                            <p className="card-text">...</p>
                            <p className="card-text">...</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">...</h5>
                            <p className="card-text">...</p>
                            <p className="card-text">...</p>
                            <p className="card-text">...</p>
                            <p className="card-text">... </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        {showData.image.original && <img src={showData.image.original} className="card-img-top" alt={showData.name} />}
                        <div className="card-body">
                            <h2 className="card-title">{showData.name}</h2>
                            <p className="card-text">{showData.summary.replace(/[<p></p><b></b>]/g,' ')}</p>
                            <p className="card-text"><strong>Genres:</strong> {showData.genres.join(', ')}</p>
                            <p className="card-text"><strong>Premiered:</strong> {showData.premiered}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Language: {showData.language}</h5>
                            <p className="card-text">Status: {showData.status}</p>
                            <p className="card-text">Rating: {showData.rating.average}</p>
                            <p className="card-text">Runtime: {showData.runtime} minutes</p>
                            <p className="card-text">Schedule: {showData.schedule.days.join(', ')} at {showData.schedule.time}</p>
                            { showData.network && <p className="card-text">Network: {showData.network.name}</p> }
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-dark my-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Details;
