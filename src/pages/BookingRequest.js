import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBookings } from '../store/featureActions'

const BookingRequest = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const getbookings = async () => {
    try {
      let payload = {
        body: false,
        params: false
      };
      const response = await dispatch(getBookings(payload)).unwrap();
      setData(response?.data?.data)
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }

  useEffect(() => {
    getbookings()
  }, [])

  return (
    <>
      <div className="modal fade addProduct_Modal" id="bookingrequestModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Booking Requests Detail</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="Product_modalDetail">
                <div className="Product_modalDetail_sect1 mb-3">
                  <div className="ProdImg mb-3">
                    <img src={require("../assets/images/user-img.png")} alt="" />
                  </div>
                  <p className="prod_name mb-2">Lorem Ipsum</p>
                </div>
                <ul className="client_detail_lists">
                  <li>
                    <label htmlFor>Rooms</label>
                    <span>01</span>
                  </li>
                  <li>
                    <label htmlFor>Adults</label>
                    <span>01</span>
                  </li>
                  <li>
                    <label htmlFor>Children ( Age 0 - 17 )</label>
                    <span>01</span>
                  </li>
                  <li>
                    <label htmlFor>Child 1</label>
                    <span>6 years old</span>
                  </li>
                </ul>
                <div className="modal_btnSect">
                  <a href="javascript:void(0)" className="cta">Accept</a>
                  <a href="javascript:void(0)" className="cta ctaDel">Reject</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <section className="content-section">
          <div className="titleSect d_flexSpacebetween">
            <h3>Booking Requests</h3>
          </div>
          <div className="row restaurant_bookingRequest mt-5">
            {
              data && data?.map((ele, index) => {
                return (
                  <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-3">
                    <div className="bookingCard">
                      <div className="user-bookingProfile">
                        <img src={`${process.env.REACT_APP_APIURL}${ele?.userimage}`} alt="" />
                      </div>
                      <div className="bookingcard_detail">
                        <p className="prod_name">{ele?.username_firstname} {ele?.username_lastname}</p>
                        <p className="prod_name">Book a Table</p>
                        <p className="prodDesc">Date : {ele?.bookingservicedate}</p>
                        <p className="prodDesc">Time : {ele?.bookingservicetime}</p>
                        <div className="modal_btnSect">
                          <a href="javascript:void(0)" className="cta" data-bs-toggle="modal" data-bs-target="#bookingrequestModal">Accept</a>
                          <a href="javascript:void(0)" className="cta ctaDel" data-bs-toggle="modal" data-bs-target="#bookingrequestModal">Reject</a>
                        </div>
                      </div>
                      <div className="edit-delSect">
                        <p className="price">$ {ele?.price}</p>
                      </div>
                    </div>
                  </div>)
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}
export default BookingRequest