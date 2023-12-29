

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBookings } from '../store/featureActions';

const ServiceBooking = () => {
    const dispatch = useDispatch()
    const [onGoingBookings, setOnGoingBookings] = useState([])
    const [previousBookings, setPreviousBookings] = useState([])

    const getAllBookings = async () => {
        try {
            let payload = {
                body: false,
                params: false

            }
            const response = await dispatch(getBookings(payload)).unwrap()
            const onGoingBookings = response?.data?.data.filter((ele) => ele.status === 'ongoing')
            const previousBookings = response?.data?.data.filter((ele) => ele.status === 'previous')
            setOnGoingBookings(onGoingBookings)
            setPreviousBookings(previousBookings)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        getAllBookings()
    }, [])

    return (
        <div>

            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Hello Martin!</h3>
                    <div className="categorySelect">
                        <select name id>
                            <option value={0}>Monthly</option>
                            <option value={1}>Weekly</option>
                            <option value={2}>Daily</option>
                        </select>
                    </div>
                </div>
                <div className="bookingSect">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-OngoingBooking-tab" data-bs-toggle="pill" data-bs-target="#pills-OngoingBooking" type="button" role="tab" aria-controls="pills-OngoingBooking" aria-selected="true">Ongoing Booking</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-PreviousBooking-tab" data-bs-toggle="pill" data-bs-target="#pills-PreviousBooking" type="button" role="tab" aria-controls="pills-PreviousBooking" aria-selected="false">Previous Booking</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-OngoingBooking" role="tabpanel" aria-labelledby="pills-OngoingBooking-tab">
                            <div className="hotel-categorySect table-responsive mt-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Service</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Clients</th>
                                            <th scope="col">Dates</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            onGoingBookings?.map((ele, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>
                                                        <p className="price">${ele?.price || 'N/A'}</p>
                                                    </td>

                                                    <td>{ele?.username_firstname} {ele?.username_lastname || 'N/A'}</td>
                                                    <td>
                                                        {ele?.booktabledate || 'N/A'}
                                                    </td>
                                                    <td>
                                                        <Link to="/store/service-booking-detail" state={{ data: ele }} className="statusOngoing">{ele?.status || 'N/A'}</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="pills-PreviousBooking" role="tabpanel" aria-labelledby="pills-PreviousBooking-tab">
                            <div className="hotel-categorySect table-responsive mt-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tables</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Clients</th>
                                            <th scope="col">Dates</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            previousBookings?.map((ele, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                <p className="price">${ele?.price || 'N/A' }</p>
                                                            </td>

                                                            <td>{ele?.username_firstname} {ele?.username_lastname || 'N/A'}</td>
                                                            <td>
                                                                {ele?.booktabledate || 'N/A'}
                                                            </td>
                                                            <td>
                                                                <Link to="/store/service-booking-detail" state={{ data: ele }} className="statusOngoing">{ele?.status || 'N/A'}</Link>
                                                            </td>
                                                        </tr>
                                                    </>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServiceBooking











