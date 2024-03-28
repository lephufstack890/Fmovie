const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const renderPages = () => {
    const pages = []
    const maxVisiblePages = 10 
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1)
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <div
          key={i}
          style={{
            padding: '5px 10px',
            border: i === currentPage ? '2px solid #ccc' : '2px solid #CBD5E0',
            backgroundColor: i === currentPage ? '#ccc' : 'transparent',
            color: i === currentPage ? 'white' : 'black',
            cursor: 'pointer',
            marginRight: '0.5rem',
            borderRadius: '6px'
          }}
          onClick={() => onPageChange(i)}
        >
          {i}
        </div>
      )
    }
    return pages
  }

  return totalPages > 0 ? (
    <div 
        style={{ display: 'flex', maxWidth: '10xl', width: 'full', justifyContent: 'center', alignItems: 'center', marginTop: '10px', padding: '5px' }}
    >
      <div 
            style={{ alignItems: 'center', justifyContent: 'end', display: 'flex'}}
        >
        <i 
            style={{ marginRight: '15px', cursor: 'pointer' }}
            onClick={() => onPageChange(currentPage - 1)}
            className="fa-solid fa-angle-left"
        ></i>
        {renderPages()}
        <i 
            style={{ marginLeft: '10px', cursor: 'pointer' }}
            onClick={() => onPageChange(currentPage + 1)}
            className="fa-solid fa-angle-right"
        ></i>
      </div>
    </div>
  ) : null
}

export default Pagination
