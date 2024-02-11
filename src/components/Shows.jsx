
import Show from './Show';

const Shows = ({ data, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="row g-2 my-5">
            {data.map((showData, index) => {
                if (showData.show) {
                    // If the data contains a 'show' property, directly pass it to Post
                    return <Show key={index} showData={showData.show} />;
                } else {
                    // If the data is already the 'show' object, pass it to Post
                    return <Show key={index} showData={showData} />;
                }
            })}
        </div>
    );
};

export default Shows;
