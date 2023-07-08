import React, { useEffect, useRef } from 'react'
import EllipsisLoading from '../Loading/EllipsisLoading'
import StaffCard from './StaffCard'
import Box from '@mui/material/Box';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import CustomPaging from '../Paging';
import NannyFilter from './Filter';

const Home = ({ nannies, setNannies, isLoading, isFilter, setIsFilter,
    currentPage, totalPages, handleChangeCurrentPage, setIsLoading
}) => {

    const filterRef = useRef();

    useEffect(() => {
        const handleClose = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setIsFilter();
            }
        }

        document.addEventListener("mousedown", handleClose)

        return (() =>
            document.removeEventListener("mousedown", handleClose))
    })

    return (
        <div className='main-session home-container'>
            <div className="list-staffs">
                <Box className="list-staffs__head">
                    <h1 className="list-staffs__title">The list of Staff</h1>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <IconButton
                            onClick={setIsFilter}
                        >
                            <FilterAltIcon sx={{ width: '48px', height: '48px', color: '#1d9a1d' }} />
                        </IconButton>
                    </Box>
                </Box>
                <div className="list-staffs__body">
                    {isLoading ?
                        <div className='list-staffs__loading'>
                            <EllipsisLoading />
                        </div>
                        :
                        <>
                            {[...nannies].length > 0 ?
                                <div className='list-staffs__data'>
                                    {nannies.map(nanny => (
                                        <StaffCard key={nanny.id} staff={nanny} />
                                    ))}
                                </div>
                                :
                                <div className='list-staffs__empty'>
                                    Not found data!
                                </div>
                            }
                        </>
                    }
                </div>
                {nannies.length > 0 &&
                    <div className="list-staffs__paging">
                        <CustomPaging
                            currentPage={currentPage}
                            totalPages={totalPages}
                            firstLabel="First"
                            lastLabel="Last"
                            setCurrentPage={handleChangeCurrentPage}
                        />
                    </div>}
            </div>
            {isFilter && <div className="filter-container" ref={filterRef}>
                <NannyFilter
                    setIsFilter={setIsFilter}
                    setIsLoading={setIsLoading}
                    setData={setNannies}
                />
            </div>}
        </div>
    )
}

export default Home