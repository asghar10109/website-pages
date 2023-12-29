
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getReview } from '../store/featureActions';
import { getProfile } from "../store/slices/userSlice"

const ReviewRatings = () => {
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const [data, setData] = useState([])

    const getReviewAndRatings = async () => {
        try {
            let payload = {
                body: false,
                params: profile._id,

            };
            const response = await dispatch(getReview(payload)).unwrap();

            setData(response?.data?.data)

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    useEffect(() => {
        getReviewAndRatings()
    }, [])

    return (
        <div>
            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Rating &amp; Review</h3>
                </div>
                <div className="row mt-5">
                    {
                        data?.length <= 0 ?
                            <p>No rating / review available</p>
                            :
                            data?.map((element, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-3">
                                        <div className="productCard reviewCard">
                                            <div className="prodDetail">
                                                <div className="rating-profile">
                                                    <span>
                                                        <img src={`${process.env.REACT_APP_APIURL}${element?.userimage}`} alt="" />
                                                    </span>
                                                    <p className="prod_name">{element?.username}</p>
                                                </div>
                                                <p className="prodDesc">{element?.review}</p>
                                            </div>
                                            <div className="edit-delSect">
                                                <a href="#" className="star-icon">

                                                    {[...Array(element.rating)]?.map((ele, index) => <FontAwesomeIcon key={index} icon={faStar} />)}


                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </section>
        </div>
    )
}

export default ReviewRatings