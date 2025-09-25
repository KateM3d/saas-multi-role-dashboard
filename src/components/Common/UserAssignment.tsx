import { useState } from "react";
import { projectTeamMembers } from "../../config/projectTeam";
import "./UserAssignment.scss";

interface UserAssignmentProps {
  onClose: () => void;
  onSubmit: (selectedUsers: string[]) => void;
  title: string;
  currentAssignees?: string[];
}

export function UserAssignment({
  onClose,
  onSubmit,
  title,
  currentAssignees = [],
}: UserAssignmentProps) {
  const [selectedUsers, setSelectedUsers] =
    useState<string[]>(currentAssignees);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedUsers);
  };

  const toggleUser = (email: string) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== email));
    } else {
      setSelectedUsers([...selectedUsers, email]);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="users-list">
            {projectTeamMembers.map((member) => (
              <div key={member.email} className="user-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(member.email)}
                    onChange={() => toggleUser(member.email)}
                  />
                  <div className="user-info">
                    <span className="user-name">{member.name}</span>
                    <span className="user-position">{member.position}</span>
                    <span className="user-role">{member.role}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Assign Users
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
