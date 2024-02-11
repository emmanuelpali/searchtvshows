
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
                    <a className="page-link" href="#" onClick={prevPage}>
                        Previous
                    </a>
                </li>
                {pageNumbers.slice(startPage - 1, endPage).map((pgNumber) => (
                    <li
                        key={pgNumber}
                        className={`page-item ${currentPage === pgNumber ? 'active' : null}`}
                    >
                        <a
                            onClick={() => setCurrentPage(pgNumber)}
                            className="page-link"
                            href="#"
                        >
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" href="#" onClick={nextPage}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
