const Load = () => {
    return (
        <>
        <div
        style={{
            position: 'fixed',
            background: 'rgba(0,0,0,0.6)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
            <div
            style={{
                position: 'absolute',
                top: '180px',
                left: '550px',
                // background: 'white',
                borderRadius: '6px',
                width: '470px',
                height: '220px',
                padding: '20px 10px'
            }} 
            >
                <div className="p-2" style={{ fontSize: '12px' }}>
                    <div >
                        <div>
                            <div style={{ textAlign: 'center', fontSize: '17px', fontWeight: '500' }}>
                                <i className="fa fa-spinner fa-spin"></i>
                                <p>Đang xử lý thanh toán...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Load;