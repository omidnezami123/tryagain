import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { fetchMember } from "./httpRequests"

export default function MemberProfile({ onClose, login }){
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [blog, setBlog] = useState("");
    useEffect(() => {
        fetchMember(login).then((response) => {
            setName(response.name);
            setCompany(response.company);
            setBlog(response.blog);
        })
    }, []);
    return createPortal(
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">{login}</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul>
                      <li>{name}</li>
                      <li>{company}</li>
                      <li>{blog}</li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.getElementById("modal-container")
      );
}