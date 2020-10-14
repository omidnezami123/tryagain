import React, { useState, useEffect } from 'react';
import "./App.css";
import { fetchMembers, addFavorite, removeFavorite, fetchFavorites } from "./httpRequests";
import MemberProfile from './MemberProfile';
import Members from './Members'
import MemberRepos from './MemberRepos';

function App() {
  const [members, setMembers] = useState([]);
  const [isMemberConfirmationShown, setIsMemberConfirmationShown] = useState(false);
  const [isReposConfimationShown, setIsReposConfirmationShown] = useState(false);
  const [currLogin, setCurrLogin] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites().then((response) => {
        setFavorites(response);
      });
}, [])

  function follow(login, id){
    const member = {
      id,
      login
    }
    addFavorite(member).then((favorite) => {
      setFavorites(favorites.concat(favorite));
    });
  }

  function unfollow(id){
    
    removeFavorite(id).then(() => {
      const filtered_favorites = favorites.filter((favorite) => {
        return favorite.id !== id;
      })
      setFavorites(filtered_favorites);
    });
  }

  function showMemberModal(login) {
    setIsMemberConfirmationShown(true);
    setCurrLogin(login);
  }

  function hideMemberModal() {
    setIsMemberConfirmationShown(false);
  }

  function showReposModal(){
    setIsReposConfirmationShown(true);
  }

  function hideReposModal(){
    setIsReposConfirmationShown(false);
  }

  useEffect(() => {
    fetchMembers((data) => {
      return Promise.all([data]);
    }).then((memberset) => {
      setMembers(memberset);
    });
  }, []);



  return (
  <>
    
    {members && <Members members={members} showMemberModal={showMemberModal} showReposModal={showReposModal} follow={follow} unfollow={unfollow} favorites={favorites}/>}
    {(members && isMemberConfirmationShown && currLogin) && <MemberProfile onClose={hideMemberModal} login={currLogin} />}
    {(isReposConfimationShown && currLogin) && <MemberRepos onClose={hideReposModal} login={currLogin} />}
    
  </>);
}

export default App;
