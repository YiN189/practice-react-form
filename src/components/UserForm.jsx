import { useState } from 'react';

export default function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    gender: 'male',
    hobbies: [],
    role: 'general'
  });
  
  const [submitted, setSubmitted] = useState(false);

  // 1. Generic Change Handler (Cleaner & DRY)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 2. Hobby Handler (Kept separate as it handles arrays)
  const handleHobbyChange = (hobby) => {
    setFormData(prev => {
      const newHobbies = prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby) // Remove if exists
        : [...prev.hobbies, hobby]; // Add if not exists
      
      return { ...prev, hobbies: newHobbies };
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!submitted ? (
          <>
            <h2 style={styles.title}>User Information</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="username">Username</label>
              <input
                id="username"
                name="username" 
                type="text"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
                placeholder="athiphat"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="firstname">Firstname</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
                style={styles.input}
                placeholder="ATHIPHAT"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="lastname">Lastname</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
                style={styles.input}
                placeholder="HIRUNADISUAN"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.labelBold}>Gender</label>
              <div style={styles.radioGroup}>
                {['male', 'female', 'others'].map((g) => (
                  <label key={g} style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      style={styles.radio}
                    />
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.labelBold}>Hobbies</label>
              <div style={styles.checkboxGroup}>
                {['music', 'movies', 'plastic models'].map((hobby) => (
                  <label key={hobby} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.hobbies.includes(hobby)}
                      onChange={() => handleHobbyChange(hobby)}
                      style={styles.checkbox}
                    />
                    {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.labelBold} htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="general">General Staff</option>
                <option value="developer">Developer</option>
                <option value="analyst">System Analyst</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              style={styles.submitButton}
            >
              Submit
            </button>
          </>
        ) : (
          <div>
            <h2 style={styles.title}>Submit Data</h2>
            <div style={styles.dataDisplay}>
              <DisplayRow label="Username" value={formData.username} />
              <DisplayRow label="Firstname" value={formData.firstname.toUpperCase()} />
              <DisplayRow label="Lastname" value={formData.lastname.toUpperCase()} />
              <DisplayRow label="Gender" value={formData.gender} />
              <DisplayRow label="Hobbies" value={formData.hobbies.join(', ')} />
              <DisplayRow label="Role" value={formData.role} />
            </div>
            <button
              onClick={() => setSubmitted(false)}
              style={styles.backButton}
            >
              Back to form
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component to clean up the display section
const DisplayRow = ({ label, value }) => (
  <p style={styles.dataRow}>
    <span style={styles.dataLabel}>{label}:</span> 
    <span style={styles.dataValue}>{value || '-'}</span>
  </p>
);

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  },
  card: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#333'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    color: '#4a5568',
    marginBottom: '8px'
  },
  labelBold: {
    display: 'block',
    color: '#4a5568',
    marginBottom: '8px',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: '#333'
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: '#333'
  },
  radioGroup: {
    display: 'flex',
    gap: '16px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#333'
  },
  radio: {
    marginRight: '8px',
    cursor: 'pointer'
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#333'
  },
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#4a5568',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  dataDisplay: {
    color: '#4a5568'
  },
  dataRow: {
    marginBottom: '8px'
  },
  dataLabel: {
    fontWeight: '500'
  },
  dataValue: {
    color: '#dc2626',
    marginLeft: '4px'
  },
  backButton: {
    marginTop: '24px',
    padding: '8px 16px',
    border: '1px solid #9ca3af',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  }
};