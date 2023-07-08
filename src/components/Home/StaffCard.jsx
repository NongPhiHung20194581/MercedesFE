import React from 'react'
import { IoStarSharp } from 'react-icons/io5'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'

const StaffCard = ({ staff }) => {

    const navigate = useNavigate();

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getFirstName(fullName) {
        // Tách chuỗi thành mảng các từ
        var nameArray = fullName.split(' ');

        // Lấy phần tử cuối cùng trong mảng là tên
        var firstName = nameArray[nameArray.length - 1];

        return firstName;
    }

    function calculateAverageRating(reviews) {
        var totalStars = 0;
        var totalReviews = reviews.length;

        for (var i = 0; i < totalReviews; i++) {
            totalStars += reviews[i].star;
        }

        var averageRating = totalStars / totalReviews;
        if (totalReviews === 0) return 0;
        else return averageRating;
    }

    function roundNumber(number) {
        return Math.round(number * 10) / 10;
    }

    return (
        <div className='staff-card'
            onClick={() => {
                navigate(`/details/${staff.id}`)
            }}
        >
            <div className="staff-card__image">
                <img src={staff?.image_link} alt="" />
            </div>
            <div className="staff-card__info">
                <div className="staff-card__name-age-star">
                    <span>{getFirstName(staff.full_name)}, {getAge(staff?.birthday)}</span>
                    <span>{roundNumber(calculateAverageRating(staff?.rating))} <IoStarSharp /></span>
                </div>
                <div className="staff-card__item staff-card__experience">
                    <span>
                        <img src={require("../../assets/img/child.png")} alt=""
                            className='experience-icon'
                        />
                        {staff?.care_exp}
                    </span>
                    <span>
                        <img src={require("../../assets/img/cook.png")} alt=""
                            className='experience-icon'
                        />
                        {staff?.cook_exp}
                    </span>
                </div>
                <div className="staff-card__item staff-card__language">
                    <img src={require("../../assets/img/language.png")} alt=""
                        className='staff-card__language__icon'
                    />
                    <span>
                        {staff.user_language && [...staff.user_language]?.map(language => language.name).join(", ")}
                        {staff.user_language_names && [...staff.user_language_names].join(", ")}
                    </span>
                </div>
                <div className="staff-card__item staff-card__address">
                    <FaMapMarkerAlt />
                    <span>{staff?.address}</span>
                </div>
                <div className="staff-card__item staff-card__salary">
                    <span>{staff?.salary.toLocaleString("vi-VN")} VND/day</span>
                </div>
            </div>
            <div className="staff-card__matching-score">
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        // value={20}
                        value={
                            isNaN(parseFloat(staff.matching_score))
                                ? 0
                                : parseFloat(staff.matching_score)
                        }
                        sx={{ color: 'red' }}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="caption"
                            component="div"
                            color="black"
                            fontWeight="bold"
                        >
                            {`${Math.round(
                                parseFloat(
                                    isNaN(parseFloat(staff.matching_score))
                                        ? 0
                                        : parseFloat(staff.matching_score),
                                ),
                            )}%`}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default StaffCard