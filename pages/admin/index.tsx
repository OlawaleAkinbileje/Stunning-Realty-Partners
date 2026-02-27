import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/supabaseClient';
import { Property, User } from '../../types';
import Icon from '../../components/Icon';
import Link from 'next/link';
import Image from 'next/image';

const AdminPanel: React.FC = () => {
  const { currentUser, isLoading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [activeView, setActiveView] = useState<'properties' | 'members'>('properties');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    if (activeView === 'properties') {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setProperties(data);
    } else {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('status', { ascending: false });

      if (!error && data) setMembers(data);
    }
    setIsLoading(false);
  }, [activeView]);

  useEffect(() => {
    if (!authLoading && (!currentUser || currentUser.role !== 'admin')) {
      router.push('/');
    } else if (currentUser?.role === 'admin') {
      fetchData();
    }
  }, [currentUser, authLoading, router, fetchData]);

  const handleStatusUpdate = async (userId: string, status: string, userEmail?: string, userName?: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId);

    if (!error) {
      setMembers(members.map(m => m.id === userId ? { ...m, status: status as User['status'] } : m));

      // If approved, send notification email
      if (status === 'active' && userEmail) {
        await fetch('/api/approve-member', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail, userName })
        });
      }
    }
  };

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    if (!confirm(`Are you sure you want to make this user a ${newRole}?`)) return;

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (!error) {
      setMembers(members.map(m => m.id === userId ? { ...m, role: newRole as User['role'] } : m));
    } else {
      alert('Error updating role: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (!error) {
      setProperties(properties.filter(p => p.id !== id));
    } else {
      alert('Error deleting property: ' + error.message);
    }
  };

  if (authLoading || isLoading) {
    return <div className="pt-40 text-center">Loading SRP Admin...</div>;
  }

  const getImagePath = (path: string) => {
    if (!path || typeof path !== 'string' || path.trim() === '') {
      return '/assets/Available-properties/Bolton/2.jpeg'; // Fallback
    }
    const trimmedPath = path.trim();
    if (trimmedPath.startsWith('http')) return trimmedPath;
    return trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`;
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 serif">Admin Control Panel</h1>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setActiveView('properties')}
                className={`text-[10px] uppercase tracking-widest font-black pb-2 border-b-2 transition-all ${activeView === 'properties' ? 'border-black text-black' : 'border-transparent text-slate-400'}`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveView('members')}
                className={`text-[10px] uppercase tracking-widest font-black pb-2 border-b-2 transition-all ${activeView === 'members' ? 'border-black text-black' : 'border-transparent text-slate-400'}`}
              >
                Network Members
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {activeView === 'properties' && (
              <>
                <Link
                  href="/admin/new"
                  className="bg-black text-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
                >
                  Add New Property
                </Link>
              </>
            )}
          </div>
        </div>

        {activeView === 'properties' ? (
          <div className="bg-white shadow-2xl overflow-hidden border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest font-black">
                <tr>
                  <th className="px-8 py-6">Property</th>
                  <th className="px-8 py-6">Type / Status</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.length > 0 ? properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative bg-slate-100 flex-shrink-0">
                          <Image
                            src={getImagePath(property.image)}
                            alt={property.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{property.title}</p>
                          <p className="text-xs text-slate-400 uppercase tracking-widest">{property.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 mr-2">{property.type}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1">{property.status}</span>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-900">
                      ₦{property.price.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/edit/${property.id}`}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-black hover:bg-slate-100 transition-all"
                        >
                          <Icon name="edit" className="text-sm" />
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Icon name="trash-alt" className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <p className="text-slate-400 uppercase tracking-widest font-bold text-xs">No properties found in the database.</p>
                      <Link href="/admin/new" className="text-blue-600 text-xs font-black uppercase tracking-widest mt-4 inline-block hover:underline">Create your first listing</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow-2xl overflow-hidden border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-widest font-black text-slate-400">
                <tr>
                  <th className="px-8 py-6">Member Details</th>
                  <th className="px-8 py-6">Role</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => handleRoleToggle(member.id, member.role)}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all ${member.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {member.role}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 ${member.status === 'active' ? 'bg-green-50 text-green-600' :
                        member.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {member.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(member.id, 'active', member.email, member.name)}
                          className="bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all"
                        >
                          Approve Member
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
