import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { fetchRepos } from "./httpRequests"

export default function MemberRepos({ onClose, login }){
    const [repos, setRepos] = useState([]);
    useEffect(() => {
        fetchRepos(login).then((response) => {
            setRepos(response);
        })
    }, []);
    return createPortal(
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">{login}'s Repositories</h5>
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
                    {repos && repos.map((repo) => {
                        return (<div key={repo.id}>
                                    <a href={`${repo.html_url}`} target="_blank">{repo.name}</a>
                                    <br></br>
                                    <a href={`${repo.description}`} target="_blank">Description</a>
                                </div>
                                )
                    })}
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