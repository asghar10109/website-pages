import React, { useEffect, useState, useMemo, useRef } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import JoditEditor from 'jodit-react';
import Nav from '../components/Layout/Nav'
import { Link, useLocation } from 'react-router-dom'
import { getTCAndPP } from '../store/featureActions/index'

const PrivacyPolicy = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const location = useLocation();
  const type = location;

  const getPrivatePolicy = async () => {
    try {
      let payload = {
        body: false,
        params:  `privacy_policy`

      };
      const response = await dispatch(getTCAndPP(payload)).unwrap();
      setData(response?.data?.data?.privacyPolicy)

    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }
  
  useEffect(() => {
    getPrivatePolicy()
  }, [])

  return (
    <>

      <section className="content-section">
        <div className="titleSect d_flexSpacebetween">
          <h3>Privacy &amp; Policy</h3>
        </div>
        <div className="term_condition_sect">
          <ul>
            <li>
              <Link to="/store/terms-and-conditions"  className="cta cta_bgWhite">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to= "/store/privacy-policy" className="cta">Privacy Policy</Link>
            </li>
          </ul>
          <div className="descPara">
            <p className="paragraph mb-3">{data}</p>
            
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy