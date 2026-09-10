import { useState, useEffect } from 'react';
import blacklistData from '../data/blacklist.json';

const getAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffd113&color=000&size=128&font-size=0.33`;

export const useBlacklist = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Siempre leemos del JSON local que Vite empaqueta
    const processedData = blacklistData.map(member => ({
      ...member,
      photo: member.photo && member.photo.trim() !== "" ? member.photo : getAvatar(member.name),
      photoPosition: member.photoPosition || 'center'
    }));
    setMembers(processedData);
  }, []);

  const saveMembers = async (newMembers) => {
    // Actualizamos el estado UI de inmediato
    setMembers(newMembers);
    
    // Intentamos guardar físicamente en el JSON (solo funcionará en localhost con npm run dev)
    try {
      const response = await fetch('/api/save-blacklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMembers, null, 2)
      });
      if (!response.ok) {
        console.warn('No se pudo guardar en el JSON. Esto es normal si estás en la versión pública de GitHub Pages.');
      }
    } catch (err) {
      console.warn('El guardado permanente solo funciona ejecutando el proyecto en local.');
    }
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
