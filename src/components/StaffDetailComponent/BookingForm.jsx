import React, { Component, useState } from 'react'

import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';
import { motion } from "framer-motion"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function formatNumber(number) {
    const formattedNumber = number?.toLocaleString('en-US');
    return formattedNumber;
}

function dateCaculate(date1, date2) {
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Time, Difference_In_Days, parseInt(Difference_In_Days.toFixed()+1));
    return parseInt(Difference_In_Days.toFixed())+1;
}


function BookingForm(props) {
    let nanny = props.nanny;
    const setIsBooking = props.setisbooking;
    const notify = props.notify;
    console.log(nanny, setIsBooking);
    const [message, setMessage] = React.useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [total, setTotal] = useState(nanny.salary)

    const handleBooking = () => {
        console.log(nanny);
        const formData = {
            staffId: nanny.id,
            endDay: startDate,
            message: message,
            total: total,
            startDay: endDate,
        };
        console.log(formData);

        axios.post('https://babybuddies-be-dev.onrender.com/api/v1/bookings/store', formData).then(() => {
            setMessage('');    
            notify();
            setIsBooking(false);
        });

    };

    return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                    <Box
                        width={'800px'}
                        backgroundColor={'white'}
                        borderRadius={'6px'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        padding={"20px 25px"}
                    >
                        <Box width={'100%'} className="form-container">
                            <h1 class="title">
                                Confirm booking
                            </h1>
                            <span class="subtitle">Staff Name</span>
                            <Box
                                sx={{
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '20px',
                                    borderRadius: '6px',
                                    padding: '10px',
                                    paddingLeft: '12px',
                                }}
                            >
                                {nanny.full_name}
                            </Box>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '49%' }}>
                                    <span class="subtitle">Start day</span>
                                    <DatePicker
                                        showIcon
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)}
                                        className='datepicker'
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                </div>
                                <div style={{ width: '49%' }}>
                                    <span class="subtitle">Finish day</span>
                                    <DatePicker
                                        showIcon
                                        selected={endDate} 
                                        onChange={(date) => {
                                            setEndDate(date)
                                            setTotal(dateCaculate(startDate, date)*nanny.salary)
                                            console.log('change', dateCaculate(startDate, endDate), startDate, endDate);
                                        }}
                                        className='datepicker'
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                    />
                                </div>
                            </div>
                            <span class="subtitle">Total price</span>
                            <Box
                                sx={{
                                    width: '49%',
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '20px',
                                    borderRadius: '6px',
                                    padding: '10px',
                                    paddingLeft: '12px',
                                    marginBottom: '18px',
                                }}
                            >
                                {formatNumber(total)} VND
                            </Box>
                            {/* <TextField
                                multiline
                                maxRows={4}
                                sx={{margin: '10px 0', width: '80%'}}
                            /> */}
                            <textarea
                                name="des"
                                id=""
                                cols="30"
                                rows="6"
                                placeholder="Write a message you want to send to the staff"
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                className='message-input'
                            ></textarea>
                            <Box display={'flex'} justifyContent={'space-around'} paddingBottom={'24px'}>
                                <Button
                                    sx={{
                                        backgroundColor: '#007320',
                                        fontWeight: '600',
                                        borderRadius: '15px',
                                        width: '160px',
                                        ':hover': { backgroundColor: 'rgb(135, 196, 120)' }
                                    }}
                                    variant="contained"
                                    onClick={handleBooking}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    sx={{
                                        backgroundColor: '#E5E5E5',
                                        fontWeight: '600',
                                        color: '#007320',
                                        borderRadius: '15px',
                                        width: '160px',
                                    }}
                                    variant="outline"
                                    onClick={() => {
                                        setMessage('');
                                        setIsBooking(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
            </motion.div>
    )
}

export default BookingForm;