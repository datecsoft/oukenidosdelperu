import { useState, useEffect } from 'react';
import blacklistData from '../data/blacklist.json';

const getAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffd113&color=000&size=128&font-size=0.33`;

export const useBlacklist = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('oukenidos_blacklist');
    if (savedData) {
      setMembers(JSON.parse(savedData));
    } else {
      const processedData = blacklistData.map(member => ({
        ...member,
        photo: member.photo && member.photo.trim() !== "" ? member.photo : getAvatar(member.name)
      }));
      setMembers(processedData);
    }
  }, []);

  const saveMembers = (newMembers) => {
    setMembers(newMembers);
    localStorage.setItem('oukenidos_blacklist', JSON.stringify(newMembers));
  };

  const addMember = (newMember) => {
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const addedMember = {
      id: newId,
      name: newMember.name,
      reason: newMember.reason,
      photo: newMember.photo.trim() !== "" ? newMember.photo : getAvatar(newMember.name),
      photoPosition: newMember.photoPosition || 'center'
    };
    saveMembers([addedMember, ...members]);
  };

  const deleteMember = (id) => {
    saveMembers(members.filter(m => m.id !== id));
  };

  const editMember = (id, updatedData) => {
    const updatedMembers = members.map(m => {
      if (m.id === id) {
        return {
          ...m,
          name: updatedData.name,
          reason: updatedData.reason,
          photo: updatedData.photo.trim() !== "" ? updatedData.photo : getAvatar(updatedData.name),
          photoPosition: updatedData.photoPosition || 'center'
        };
      }
      return m;
    });
    saveMembers(updatedMembers);
  };

  return { members, addMember, deleteMember, editMember };
};
