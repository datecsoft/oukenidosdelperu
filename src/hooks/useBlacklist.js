import { useState } from 'react';
import blacklistData from '../data/blacklist.json';
import { Octokit } from '@octokit/rest';

const getAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffd113&color=000&size=128&font-size=0.33`;

export const useBlacklist = () => {
  const [members, setMembers] = useState(() => {
    return blacklistData.map(m => ({
      ...m,
      photo: m.photo && m.photo.trim() !== "" ? m.photo : getAvatar(m.name),
      photoPosition: m.photoPosition || 'center'
    }));
  });

  const saveMembers = async (newMembers, githubToken) => {
    setMembers(newMembers);

    if (githubToken) {
      try {
        const octokit = new Octokit({ auth: githubToken });
        const owner = 'datecsoft';
        const repo = 'oukenidosdelperu';
        const path = 'src/data/blacklist.json';

        let sha;
        try {
          const { data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path,
            ref: 'main',
            headers: {
              'If-None-Match': ''
            }
          });
          sha = fileData.sha;
        } catch (err) {
          if (err.status !== 404) throw err;
        }

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(newMembers, null, 2))));
        
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path,
          message: 'Actualización de la Lista Negra desde el panel de control 🚀',
          content,
          sha,
          branch: 'main',
        });
      } catch (err) {
        console.error('Error al guardar en GitHub:', err);
        throw err;
      }
    }
  };

  const addMember = async (newMember, githubToken) => {
    const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const addedMember = {
      id: newId,
      name: newMember.name,
      reason: newMember.reason,
      photo: newMember.photo && newMember.photo.trim() !== "" ? newMember.photo : getAvatar(newMember.name),
      photoPosition: newMember.photoPosition || 'center'
    };
    await saveMembers([addedMember, ...members], githubToken);
  };

  const deleteMember = async (id, githubToken) => {
    await saveMembers(members.filter(m => m.id !== id), githubToken);
  };

  const editMember = async (id, updatedData, githubToken) => {
    const updatedMembers = members.map(m => {
      if (m.id === id) {
        return {
          ...m,
          name: updatedData.name,
          reason: updatedData.reason,
          photo: updatedData.photo && updatedData.photo.trim() !== "" ? updatedData.photo : getAvatar(updatedData.name),
          photoPosition: updatedData.photoPosition || 'center'
        };
      }
      return m;
    });
    await saveMembers(updatedMembers, githubToken);
  };

  return { members, addMember, deleteMember, editMember };
};
