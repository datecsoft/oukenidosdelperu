import React, { useState } from 'react';
import { IconSkull, IconTrash, IconPlus, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { useBlacklist } from '../hooks/useBlacklist';

const AdminPanel = () => {
  const { members, addMember, deleteMember, editMember } = useBlacklist();
  
  const [newMember, setNewMember] = useState({ name: '', reason: '', photo: '', photoPosition: 'center' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', reason: '', photo: '', photoPosition: 'center' });

  const positionOptions = [
    { value: 'top', label: 'Arriba' },
    { value: 'center', label: 'Centro' },
    { value: 'bottom', label: 'Abajo' },
    { value: 'left', label: 'Izquierda' },
    { value: 'right', label: 'Derecha' }
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.reason) return;
    addMember(newMember);
    setNewMember({ name: '', reason: '', photo: '', photoPosition: 'center' });
  };

  const startEditing = (member) => {
    setEditingId(member.id);
    setEditForm({ 
      name: member.name, 
      reason: member.reason, 
      photo: member.photo,
      photoPosition: member.photoPosition || 'center'
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: '', reason: '', photo: '', photoPosition: 'center' });
  };

  const saveEditing = (id) => {
    if (!editForm.name || !editForm.reason) return;
    editMember(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Seguro que quieres perdonar a este usuario y sacarlo de la lista?')) {
      deleteMember(id);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-brand-darker">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary via-brand-darker to-brand-darker z-0 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-brand-primary/20 rounded-full mb-6 shadow-[0_0_30px_rgba(255,209,19,0.3)]">
            <IconSkull size={64} className="text-brand-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight mb-4 text-white">
            ADMINISTRACIÓN
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Añade, edita o elimina a los sentenciados de la red.
          </p>
        </div>

        {/* Formulario de Agregar */}
        <div className="max-w-2xl mx-auto mb-16 glass bg-black/40 p-6 rounded-2xl border border-brand-primary/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <IconPlus className="text-brand-primary" /> Agregar Nuevo Baneado
          </h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Nombre del infractor" 
              className="bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              required
            />
            <input 
              type="text" 
              placeholder="Motivo del baneo (Obligatorio)" 
              className="bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
              value={newMember.reason}
              onChange={(e) => setNewMember({...newMember, reason: e.target.value})}
              required
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="url" 
                placeholder="URL de foto (Opcional)" 
                className="bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary transition-colors flex-1"
                value={newMember.photo}
                onChange={(e) => setNewMember({...newMember, photo: e.target.value})}
              />
              <select
                className="bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary transition-colors sm:w-1/3"
                value={newMember.photoPosition}
                onChange={(e) => setNewMember({...newMember, photoPosition: e.target.value})}
              >
                {positionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>Recorte: {opt.label}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="bg-brand-primary text-black font-bold py-3 rounded-lg hover:bg-brand-primary/90 transition-colors shadow-lg mt-2"
            >
              CONDENAR AL OLVIDO
            </button>
          </form>
        </div>

        {/* Lista de Administración */}
        <div className="glass bg-black/60 rounded-2xl overflow-hidden border border-brand-primary/30 shadow-[0_0_40px_rgba(255,209,19,0.1)]">
          <div className="p-6 bg-brand-primary/10 border-b border-brand-primary/30 flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading text-white">Lista de Sentenciados</h2>
            <span className="bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-full">
              {members.length} BANEADOS
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-brand-primary">
                  <th className="p-4 font-bold">Foto</th>
                  <th className="p-4 font-bold">Nombre</th>
                  <th className="p-4 font-bold">Motivo</th>
                  <th className="p-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      {editingId === member.id ? (
                        <div className="flex flex-col gap-2 w-32">
                          <input 
                            type="url" 
                            className="bg-brand-dark border border-white/20 p-1 text-xs text-white rounded w-full" 
                            placeholder="URL foto"
                            value={editForm.photo} 
                            onChange={(e) => setEditForm({...editForm, photo: e.target.value})}
                          />
                          <select
                            className="bg-brand-dark border border-white/20 p-1 text-xs text-white rounded w-full"
                            value={editForm.photoPosition}
                            onChange={(e) => setEditForm({...editForm, photoPosition: e.target.value})}
                          >
                            {positionOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-full object-cover border border-brand-primary/50" 
                          style={{ objectPosition: member.photoPosition || 'center' }}
                        />
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === member.id ? (
                        <input 
                          type="text" 
                          className="bg-brand-dark border border-white/20 p-2 text-white rounded w-full" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        />
                      ) : (
                        <span className="text-white font-medium">{member.name}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {editingId === member.id ? (
                        <input 
                          type="text" 
                          className="bg-brand-dark border border-white/20 p-2 text-white rounded w-full" 
                          value={editForm.reason} 
                          onChange={(e) => setEditForm({...editForm, reason: e.target.value})}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">"{member.reason}"</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {editingId === member.id ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => saveEditing(member.id)} className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40" title="Guardar">
                            <IconCheck size={20} />
                          </button>
                          <button onClick={cancelEditing} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40" title="Cancelar">
                            <IconX size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEditing(member)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40" title="Editar">
                            <IconEdit size={20} />
                          </button>
                          <button onClick={() => handleDelete(member.id)} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40" title="Eliminar">
                            <IconTrash size={20} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
