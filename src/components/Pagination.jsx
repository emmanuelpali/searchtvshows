
import 'bootstrap/dist/css/bootstrap.css';

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(numberOfPages + 1).keys()].slice(1);
    const totalPagesToShow = 5; // Number of pages to show at once
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);

    let startPage, endPage;
    if (numberOfPages <= totalPagesToShow) {
        startPage = 1;
        endPage = numberOfPages;
    } else if (currentPage <= halfTotalPagesToShow) {
        startPage = 1;
        endPage = totalPagesToShow;
    } else if (currentPage + halfTotalPagesToShow >= numberOfPages) {
        startPage = numberOfPages - totalPagesToShow + 1;
        endPage = numberOfPages;
    } else {
        startPage = currentPage - halfTotalPagesToShow;
        endPage = currentPage + halfTotalPagesToShow;
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button className="page-link" href="#" 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.slice(startPage - 1, endPage).map((pgNumber) => (
                    <li
                        key={pgNumber}
                        className={`page-item ${currentPage === pgNumber ? 'active' : null}`}
                    >
                        <button
                            onClick={() => setCurrentPage(pgNumber)}
                            className="page-link"
                            href="#shows"
                        >
                            {pgNumber}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button className="page-link" 
                    href="#" 
                    onClick={nextPage}
                    disabled={currentPage === numberOfPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
