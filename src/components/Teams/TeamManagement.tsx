import { useState } from "react";
import { sampleTeams } from "../../config/teams";
import "./TeamManagement.scss";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

export function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>(sampleTeams);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showEditMember, setShowEditMember] = useState(false);

  const [newTeamData, setNewTeamData] = useState({
    name: "",
    description: "",
  });

  const [newMemberData, setNewMemberData] = useState({
    name: "",
    role: "",
    email: "",
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam = {
      id: Date.now().toString(),
      name: newTeamData.name,
      description: newTeamData.description,
      members: [],
    };
    setTeams([...teams, newTeam]);
    setShowAddTeam(false);
    setNewTeamData({ name: "", description: "" });
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    if (editingMember) {
      // Update existing member
      setTeams(
        teams.map((team) => {
          if (team.id === selectedTeam) {
            return {
              ...team,
              members: team.members.map((member) =>
                member.id === editingMember.id
                  ? {
                      ...member,
                      name: newMemberData.name,
                      role: newMemberData.role,
                      email: newMemberData.email,
                    }
                  : member
              ),
            };
          }
          return team;
        })
      );
      setShowEditMember(false);
      setEditingMember(null);
    } else {
      // Add new member
      const newMember = {
        id: Date.now().toString(),
        name: newMemberData.name,
        role: newMemberData.role,
        email: newMemberData.email,
      };

      setTeams(
        teams.map((team) => {
          if (team.id === selectedTeam) {
            return {
              ...team,
              members: [...team.members, newMember],
            };
          }
          return team;
        })
      );
      setShowAddMember(false);
    }

    setNewMemberData({ name: "", role: "", email: "" });
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
    }
  };

  const handleDeleteMember = (teamId: string, memberId: string) => {
    setTeams(
      teams.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            members: team.members.filter((member) => member.id !== memberId),
          };
        }
        return team;
      })
    );
  };

  return (
    <div className="team-management">
      <div className="team-management__header">
        <h2>Team Management</h2>
        <button className="btn-primary" onClick={() => setShowAddTeam(true)}>
          Create New Team
        </button>
      </div>

      <div className="team-management__content">
        <div className="teams-list">
          <h3>Teams</h3>
          {teams.map((team) => (
            <div
              key={team.id}
              className={`team-card ${
                selectedTeam === team.id ? "selected" : ""
              }`}
              onClick={() => setSelectedTeam(team.id)}
            >
              <div className="team-card__header">
                <h4>{team.name}</h4>
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTeam(team.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <p>{team.description}</p>
              <span className="team-members-count">
                {team.members.length} members
              </span>
            </div>
          ))}
        </div>

        {selectedTeam && (
          <div className="team-details">
            <div className="team-details__header">
              <h3>Team Members</h3>
              <button
                className="btn-primary"
                onClick={() => setShowAddMember(true)}
              >
                Add Member
              </button>
            </div>

            <div className="members-list">
              {teams
                .find((team) => team.id === selectedTeam)
                ?.members.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <p>{member.email}</p>
                      <span className="member-role">{member.role}</span>
                    </div>
                    <div className="member-actions">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditingMember(member);
                          setNewMemberData({
                            name: member.name,
                            role: member.role,
                            email: member.email,
                          });
                          setShowEditMember(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() =>
                          handleDeleteMember(selectedTeam, member.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {showAddTeam && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Team</h3>
            <form onSubmit={handleCreateTeam}>
              <div className="form-group">
                <label>Team Name</label>
                <input
                  type="text"
                  value={newTeamData.name}
                  onChange={(e) =>
                    setNewTeamData({ ...newTeamData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTeamData.description}
                  onChange={(e) =>
                    setNewTeamData({
                      ...newTeamData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Create Team
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddTeam(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(showAddMember || showEditMember) && selectedTeam && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingMember ? "Edit Member" : "Add New Member"}</h3>
            <form onSubmit={handleMemberSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newMemberData.name}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newMemberData.role}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, role: e.target.value })
                  }
                  required
                  className="role-select"
                >
                  <option value="">Select a role</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                  <option value="reader">Reader</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newMemberData.email}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingMember ? "Update Member" : "Add Member"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowAddMember(false);
                    setShowEditMember(false);
                    setEditingMember(null);
                    setNewMemberData({ name: "", role: "", email: "" });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
