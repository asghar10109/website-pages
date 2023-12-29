
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { completeBooking, getBookingByServiceId, reportUser } from '../store/featureActions';
import PlaceholderImage from '../assets/images/placeholder.jpg';
import { Modal } from 'react-bootstrap';
import { getProfile } from '../store/slices/userSlice';
import { role_type } from '../constants/app-constants';

const HotelBookingDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const data = location.state
    const [bookingDetail, setBookingDetail] = useState(null)
    const [reportUserModal, setReportUserModal] = useState(null)
    const profile = useSelector(getProfile)

    const getBookingDetail = async (params = null) => {
        try {
            let payload = {
                body: false,
                params: params
            }
            const response = await dispatch(getBookingByServiceId(payload)).unwrap()
            setBookingDetail(response?.data?.data[0])
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const completeCurrentBooking = async () => {
        try {
            let payload = {
                body: false,
                params: bookingDetail?._id,
                isToast: true,
            }
            const response = await dispatch(completeBooking(payload)).unwrap()
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    useEffect(() => {
        if (data) {
            getBookingDetail()
        }
    }, [data])


    console.log(bookingDetail, "bookingDetail")

    return (
        <>
            <div className="modal fade addProduct_Modal" id="cancelModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reason Cancel Booking</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="report_modalContent">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1a" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1a">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2a" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2a">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault3a" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault3a">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault4a" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault4a">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault5a" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault5a">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                <div className="userInputs">
                                    <textarea name placeholder="Description" defaultValue={""} />
                                </div>
                                <div>
                                    <a href="javascript:void(0)" className="cta">Submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Booking Detail</h3>
                    </div>
                    <div className="roomDetail-sect ongoing_wrapper">
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <form action className="user-desc">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label>Price per day</label>
                                                <input type="text" readOnly value={bookingDetail?.priceperdays || "N/A"} />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label>Price</label>
                                                <input type="text" readOnly value={bookingDetail?.prices || "N/A"} />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="userInputs mb-0">
                                                <label>Amenitie</label>
                                                <ul className="Amenities p-0">
                                                    {
                                                        bookingDetail?.amenitie?.map((item) => (
                                                            <li>
                                                                <img src={require("../assets/images/house-building.png")} alt="" />
                                                                <span>{item}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label>Rule</label>
                                                <textarea name readOnly value={bookingDetail?.rule || "N/A"} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6">
                                <p className="paraTitle">Client Details</p>
                                <div className="clientDetail">
                                    <ul className="client_detail_lists">
                                        <li>
                                            <label>Name</label>
                                            <span>{bookingDetail?.username_firstname + " " + bookingDetail?.username_lastname || "N/A"}</span>
                                        </li>
                                        {/* <li>
                      <label>Adults</label>
                      <span>ad </span>
                    </li>
                    <li>
                      <label>Children ( Age 0 - 17 )</label>
                      <span>01</span>
                    </li>
                    <li>
                      <label>Child 1</label>
                      <span>6 years old</span>
                    </li> */}
                                        <li>
                                            <label>Status</label>
                                            <span className="statusOngoing text-capitalize">{bookingDetail?.status || "N/A"} </span>
                                        </li>
                                        <li>
                                            <label>Date</label>
                                            <span>{bookingDetail?.booking_room_date || "N/A"}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d_flexSpacebetween my-3">
                                    <p className="paraTitle">Images</p>
                                </div>
                                <div className="row">
                                    {
                                        bookingDetail?.roomImages?.map((item, index) => (
                                            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                                <div className="room_images">
                                                    <img src={`${process.env.REACT_APP_APIURL}${item}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-4 mb-2">
                                        <button className="cta" onClick={() => setReportUserModal(true)} >Report User</button>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-4 mb-2">
                                        <button className="cta" data-bs-toggle="modal" data-bs-target="#cancelModal">Cancel Booking</button>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-4 mb-2">
                                        <button className="cta" onClick={completeCurrentBooking}>Mark As Completed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <ReportUserModal reportUserModal={reportUserModal} setReportUserModal={setReportUserModal} userId={bookingDetail?.userid} />
        </>

    )
}

const ReportUserModal = ({ reportUserModal, setReportUserModal, userId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [reportedtext, setReportedtext] = useState("")

    const reportUserById = async () => {
        try {
            let payload = {
                body: {
                    userid: userId,
                    reportedtext: reportedtext,
                },
                params: false,
                isToast: true,

            }
            const response = await dispatch(reportUser(payload)).unwrap()
            setReportUserModal(false)
            resetForm()
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }
    }

    const resetForm = () => {
        setReportedtext('')
    }

    return (
        <Modal
            show={reportUserModal}
            centered
            onHide={() => setReportUserModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Reason Report User</Modal.Title>
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /> */}
            </Modal.Header>

            <Modal.Body>
                <div className="report_modalContent">
                    <ul>
                        <li>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1b" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1b">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2b" defaultChecked />
                                <label className="form-check-label" htmlFor="flexRadioDefault2b">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3b" />
                                <label className="form-check-label" htmlFor="flexRadioDefault3b">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault4b" />
                                <label className="form-check-label" htmlFor="flexRadioDefault4b">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault5b" />
                                <label className="form-check-label" htmlFor="flexRadioDefault5b">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                </label>
                            </div>
                        </li>
                    </ul>
                    <div className="userInputs">
                        <textarea placeholder="Description" value={reportedtext} onChange={(e) => setReportedtext(e.target.value)} />
                    </div>
                    <div>
                        <a href="javascript:void(0)" className="cta" onClick={reportUserById}>Submit</a>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default HotelBookingDetail