import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button/button.component";
import InviteCrew from "../../components/invite-crew/invite-crew";
import { crewTypes } from "../../redux/types/crew.types";
import { fetchcrews, DeleteCrew, TOGGLE_POPUP_UPDATE, POPUP_DELETE } from "../../redux/actions/crewAction";
import { fetchProperties } from "../../redux/actions/propertyAction";
import UpdateCrew from '../../components/update-crew/update-crew'
import DeleteModal from '../../components/DeleteDialouge/deleteModal'
import "./crew.styles.scss";

const Crew = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const { showPopup, crews, showPopupUpdate, showPopupDelete } = useSelector((state) => state.crewReducer);
  const { properties } = useSelector((state) => state.propertyReducer);
  useEffect(() => {
    dispatch(fetchProperties({ token: token }));

  }, [dispatch]);
  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-page-heading">
          <h2>Crew</h2>
        </div>
        <div className="crew-container">
          <div className="crew-left">

            <Button
              type="main"
              onClick={() => {
                dispatch({ type: crewTypes.TOGGLE_POPUP });
              }}
            >
              Add crew member
            </Button>

            <select
              required
              // value={property}
              onChange={(e) => dispatch(fetchcrews({ token: token, proprtyid: e.target.value }))}
              className="select-input"
              name="property"
              id=""
            >
              <option value="">Select property to view crew</option>
              {properties.map((el) => (
                <option key={el.pk} value={el.pk}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
          <div className="crew-right">
            <div className="crew-info">
              <p>- Add family and close friends to your crew .</p>
              <p>- Crew members can view and participate in photo sharing</p>
              <p>
                - Set permissions for each person for the right balance of
                privacy.
              </p>
            </div>
            <div className="crew-table-container">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Role</th>
                    <th scope="col">Settings</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    crews.length > 0 && crews?.map((data) =>

                      <tr>
                        <td className="table-name">{data?.user?.name}</td>
                        <td>{data?.user?.email}</td>
                        <td>{data?.user?.mobile}</td>
                        <td>{data?.user?.role}</td>
                        <td>
                          {/* <span class="material-icons" onClick={() => {
                            dispatch(TOGGLE_POPUP_UPDATE({ payloadToUpdate: data }))
                          }}>edit</span> */}
                          <span onClick={() => {
                            dispatch(POPUP_DELETE({
                              payloadToDelete: {
                                Id: data?.pk,
                                action: "DeletCrew",
                                data: data
                              }
                            }))
                          }} class="material-icons">delete</span>
                          {/* <span onClick={() => { dispatch(DeleteCrew({ token: token, Id: data?.pk, crew: data })) }} class="material-icons">delete</span> */}
                        </td>

                      </tr>
                    )
                  }





                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              {/* <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="/">
                      <span class="material-icons">chevron_left</span>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="/">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="/">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="/">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="/">
                      <span class="material-icons">chevron_right</span>
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
      {showPopup && <InviteCrew />}
      {showPopupUpdate && <UpdateCrew />}
      {showPopupDelete && <DeleteModal />}
    </>
  );
};

export default Crew;
