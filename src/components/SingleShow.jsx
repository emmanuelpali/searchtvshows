
import PropTypes from 'prop-types';

const SingleShow = ({ showData }) => {
    const { name, image, summary, genres, premiered } = showData;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <img src={image.original} className="card-img-top" alt={name} />
                        <div className="card-body">
                            <h2 className="card-title">{name}</h2>
                            <p className="card-text">{summary}</p>
                            <p className="card-text"><strong>Genres:</strong> {genres.join(', ')}</p>
                            <p className="card-text"><strong>Premiered:</strong> {premiered}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <img src={image.medium} className="card-img-top" alt={name} />
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SingleShow.propTypes = {
    showData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.shape({
            original: PropTypes.string.isRequired,
            medium: PropTypes.string.isRequired
        }),
        summary: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
        premiered: PropTypes.string
    }).isRequired
};

export default SingleShow;
