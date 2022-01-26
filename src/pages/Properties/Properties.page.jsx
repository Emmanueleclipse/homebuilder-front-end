import React, { useEffect } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { Link } from "react-router-dom";
import "./Properties.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/actions/propertyAction";
import { propertyTypes } from "../../redux/types/property.type";
import UpdateProperty from '../Update Property/update-property.component'
import { deleteProperty, TOGGLE_POPUP } from "../../redux/actions/propertyAction";

import { POPUP_DELETE } from "../../redux/actions/crewAction";
import DeleteModal from '../../components/DeleteDialouge/deleteModal'

const Property = ({ history }) => {
  const dispatch = useDispatch();

  const { token, error, loading } = useSelector((state) => state.authReducer);
  const {
    properties,
    showPopup,
    error: propertyError,
    loading: propertyLoading,
  } = useSelector((state) => state.propertyReducer);
  const { showPopupDelete } = useSelector((state) => state.crewReducer);

  useEffect(() => {

    if (token) dispatch(fetchProperties({ token: token }));
  }, [dispatch, token]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <h2>Properties</h2>
      </div>
      <div className="home-container">
        <div className="home-search">
          <label htmlFor="">Enter date : </label>
          <div className="home-search-control">
            <FormInput type="date" />
            <button>Submit</button>
          </div>
        </div>
        <div className="home-content">
          <div className="home-head-card">
            <div className="home-head-card-left">
              <div>Today</div>
              <span class="material-icons">settings</span>
            </div>
            <div className="home-head-card-right">
              <Button type="main">Reports</Button>
            </div>
          </div>
          <div className="home-cards-list">
            {properties.map((property) => (
              <div className="home-card">
                <div className="home-card-header">
                  <div className="home-card-left">

                    <div className="home-card-info">
                      <div className="home-card-title">
                        {property.name}
                      </div>
                      <div className="home-card-subtitle">
                        {property.address}, {properties.city}
                      </div>
                    </div>
                  </div>
                  <div className="home-card-right">
                    <Link to={"/property-activities/" + property.pk}>
                      <button className="view-activity-btn">
                        View
                      </button>
                    </Link>
                    <button onClick={() => {
                      dispatch(TOGGLE_POPUP({ payloadToUpdate: property }));

                    }} className="edit-activity-btn">
                      Edit
                    </button>
                    <button onClick={() => {
                      dispatch(POPUP_DELETE({
                        payloadToDelete: {
                          Id: property.pk,
                          action: "DeleteProperty",
                          data: property
                        }
                      }))
                    }} className="edit-activity-btn">
                      Delete
                    </button>

                  </div>

                </div>
                <div className="home-card-detail"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <UpdateProperty />}
      {showPopupDelete && <DeleteModal />}
    </div>
  );
};

export default Property;
