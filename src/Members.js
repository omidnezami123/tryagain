import React, { useState, useEffect } from 'react'
import { fetchFavorites } from './httpRequests'

export default function Members({ members, showMemberModal, showReposModal, follow, unfollow, favorites }){
    return (members.map((member) => {
        return( 
        <div key={member.id} id="div-container">
              <p onClick={() => {
                showMemberModal(member.login);
                }}>{member.login}</p>
              <img src={member.avatar_url} onClick={() => {
                showMemberModal(member.login);
                }}/>
                <br></br>
                <button onClick={() => {
                    showReposModal(member.login);
                }}>
                    Repos
                </button>
                {favorites && favorites.find((datamem) => {
                    console.log(datamem.id === member.id)
                    return datamem.id === member.id
                }) ? (<button onClick={() => {unfollow(member.id)}}>
                        Unfollow
                    </button>
                ) : (
                    <button onClick={() => {follow(member.login, member.id)}}>
                                Follow
                            </button>
                )}
        </div>);
    }));
}