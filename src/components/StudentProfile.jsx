import React, { useState } from 'react';
import { GraduationCap, UploadCloud, BookOpen, Landmark, Award, UserRound } from 'lucide-react';

const tabs = [
  { label: 'Academic Profile', Icon: GraduationCap },
  { label: 'Upload Documents', Icon: UploadCloud },
  { label: 'Qualifications', Icon: BookOpen },
  { label: 'Bank Details', Icon: Landmark },
  { label: 'My Achievements', Icon: Award },
];

const attendanceSubjects = [
  ['INFORMATION AND CYBER SECURITY', 'Theory', 46],
  ['IOT AND CLOUD VIRTUALIZATION', 'Theory', 57],
  ['ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING', 'Theory', 57],
  ['DATA MINING AND DATA ANALYTICS', 'Theory', 57],
  ['INFORMATION AND CYBER SECURITY LAB', 'Lab', 12],
  ['IOT AND CLOUD VIRTUALIZATION LAB', 'Lab', 15],
  ['ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING LAB', 'Lab', 14],
  ['DATA MINING AND DATA ANALYTICS LAB', 'Lab', 13],
  ['CRM AUTOMATION - SALESFORCE', 'Theory', 0],
  ['INDIAN CULTURE AND CONSTITUTION', 'Theory', 25],
  ['DATA WAREHOUSING AND BUSINESS INTELLIGENCE', 'Theory', 52],
];
const schools = ['Montessori High School', 'Silver Oaks High School', 'Sri Chaitanya Techno School', 'Delhi Public School', 'St. Ann’s High School', 'Kennedy High'];
const colleges = ['Career Point Junior College', 'Narayana Junior College', 'Sri Chaitanya Junior College', 'Page Junior College', 'Resonance Junior College', 'Excellencia Junior College'];
const parentNames = ['Ramesh Kumar', 'Srinivas Reddy', 'Mahesh Sharma', 'Ravi Kumar', 'Suresh Gouni', 'Prasad Rao'];
const parentMothers = ['Lakshmi', 'Sujatha', 'Anitha', 'Padma', 'Swathi', 'Vijaya'];
const cities = ['Kandlakoya, Medchal, Telangana', 'Kompally, Hyderabad, Telangana', 'Suchitra, Hyderabad, Telangana', 'Alwal, Secunderabad, Telangana'];

function initials(name = 'Student') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

export default function StudentProfile({ student }) {
  const [activeTab, setActiveTab] = useState('Academic Profile');
  const [term, setTerm] = useState('III Year I Semester');
  const seed = Math.abs(Number(String(student.mobile || student.roll || '').replace(/\D/g, '').slice(-4)) || 0);
  const school = schools[seed % schools.length];
  const juniorCollege = colleges[(seed + 2) % colleges.length];
  const year = student.year?.startsWith('3') ? '3 Year' : student.year?.startsWith('2') ? '2 Year' : '3 Year';
  const dob = student.dob || `${(seed % 27) + 1} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][seed % 12]} 2007`;
  const parent = student.parentName || `${parentNames[seed % parentNames.length]} - FATHER`;
  const parentPhone = student.parentPhone || `9${String(100000000 + (seed * 7919) % 899999999).padStart(9, '0')}`;
  const parentEmail = student.parentEmail || `${parent.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '') || 'parent'}@gmail.com`;
  const email = student.email || `${String(student.name || 'student').toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
  const section = `${student.branch || 'CSM-A'}[2024-2028] - A`;
  const isSaiKiran = student.mobile === '9346098128';
  const isDruthi = student.mobile === '8008803379';
  const subjectAttendance = attendanceSubjects.map(([subject, type, total], i) => {
    const attended = total === 0 ? 0 : Math.max(0, Math.min(total, Math.round(total * (0.68 + ((seed + i * 7) % 27) / 100))));
    return { subject, type, total, attended };
  });
  const totalClasses = subjectAttendance.reduce((sum, row) => sum + row.total, 0);
  const totalAttended = subjectAttendance.reduce((sum, row) => sum + row.attended, 0);
  const attendancePct = totalClasses ? (totalAttended / totalClasses * 100).toFixed(2) : '0.00';

  return <div className="reference-profile">
    <section className="reference-profile-banner" />
    <div className="reference-profile-heading">
      {isSaiKiran || isDruthi
        ? <img src={isSaiKiran ? '/profile-saikiran.png' : '/profile-druthi.png'} alt={`${student.name} profile`} className="reference-profile-photo" />
        : <div className="reference-profile-photo reference-profile-initials" aria-label={`${student.name} profile placeholder`}><span>{initials(student.name)}</span></div>}
      <h1>{String(student.name || 'Student').toUpperCase()}</h1>
      <p className="reference-profile-meta">{student.roll} <b>|</b> DOB: {dob}</p>
      <div className="reference-profile-tabs">{tabs.map(({ label, Icon }) => <button key={label} className={activeTab === label ? 'active' : ''} onClick={() => setActiveTab(label)}><Icon size={13}/>{label}</button>)}</div>
      <label className="reference-term">Terms<select value={term} onChange={e => setTerm(e.target.value)}><option>III Year I Semester</option><option>III Year II Semester</option><option>II Year I Semester</option><option>II Year II Semester</option><option>I Year I Semester</option><option>I Year II Semester</option></select></label>
    </div>
    {activeTab === 'Academic Profile' && <div className="reference-profile-columns">
      <div className="reference-profile-left">
        <section className="reference-profile-card"><h2>Parent Details</h2><div className="reference-field"><small>Parent 1</small><p>{parent} - {parentPhone} (MOB) - {parentEmail}</p></div><div className="reference-field"><small>Parent 2</small><p>{parentMothers[(seed + 1) % parentMothers.length]} - MOTHER</p></div></section>
        <section className="reference-profile-card"><h2>Academic Details</h2><div className="reference-field"><small>Batch</small><p>B.TECH R24 [2024-2028]</p></div><div className="reference-field"><small>Roll Number</small><p>{student.roll}</p></div><div className="reference-field"><small>Year</small><p>{year}</p></div><div className="reference-field"><small>Current Term</small><p>{term}</p></div><div className="reference-field"><small>Section</small><p>{section}</p></div><div className="reference-field"><small>School</small><p>{school}</p></div><div className="reference-field"><small>Intermediate College</small><p>{juniorCollege}</p></div><div className="reference-field"><small>Degree College</small><p>CMR Institute of Technology</p></div><div className="reference-field"><small>Room</small><p>{`Room ${100 + (seed % 40)}`}</p></div></section>
        <section className="reference-profile-card"><h2>Personal Details</h2><div className="reference-field"><small>Full Name as per X</small><p>{student.name}</p></div><div className="reference-field"><small>Gender</small><p>{student.gender || (seed % 2 ? 'Female' : 'Male')}</p></div><div className="reference-field"><small>Father Name as per X</small><p>{parent.replace(' - FATHER', '')}</p></div><div className="reference-field"><small>Mother Name as per X</small><p>{parentMothers[(seed + 1) % parentMothers.length]}</p></div><div className="reference-field"><small>Mobile Number</small><p>{student.mobile}</p></div><div className="reference-field"><small>Email</small><p>{email}</p></div><div className="reference-field"><small>Address</small><p>{student.address || cities[seed % cities.length]}</p></div><div className="reference-field"><small>Nationality</small><p>Indian</p></div><div className="reference-field"><small>Mother Tongue</small><p>Telugu</p></div></section>
      </div>
      <div className="reference-profile-right">
        <section className="reference-profile-card reference-attendance"><h2>Attendance for {term}</h2><ul className="reference-notes"><li>The displayed attendance is for reference only and may be subject to technical errors.</li><li>For accurate records, please contact respective department.</li></ul><div className="reference-table-title">Subject Wise Attendance</div><div className="reference-attendance-wrap"><table><thead><tr><th>Sl No</th><th>Subject</th><th>Type</th><th>Total Classes</th><th>Attended</th><th>Absent</th><th>Percentage</th></tr></thead><tbody>{subjectAttendance.map((row, i) => { const pct = row.total ? (row.attended / row.total * 100) : 0; return <tr key={row.subject}><td>{i + 1}</td><td>{row.subject}</td><td>{row.type}</td><td>{row.total}</td><td>{row.attended}</td><td>{row.total - row.attended}</td><td>{pct.toFixed(2)}%</td></tr>; })}</tbody></table></div><div className="reference-table-title cumulative-title">Cumulative Attendance</div><table className="reference-cumulative"><thead><tr><th>Total Classes</th><th>Attended</th><th>Absent</th><th>Percentage</th></tr></thead><tbody><tr><td>{totalClasses}</td><td>{totalAttended}</td><td>{totalClasses - totalAttended}</td><td>{attendancePct}%</td></tr></tbody></table></section>
        <section className="reference-profile-card reference-attendance"><h2>Mid Exams for {term}</h2><div className="reference-attendance-wrap"><table><thead><tr><th>Sl No</th><th>Subject Code</th><th>Subject Name</th><th>Mid I</th><th>Assign. I</th><th>Mid II</th><th>Assign. II</th></tr></thead><tbody>{subjectAttendance.slice(0, 11).map((row, i) => <tr key={row.subject}><td>{i + 1}</td><td>24{['CSPC52','CSPC53','CAPCS1','DPCP52'][i % 4]}</td><td>{row.subject}</td><td>{i % 3 === 0 ? `${18 + ((seed + i) % 12)}/30` : '—'}</td><td>{i % 4 === 0 ? '5/5' : '—'}</td><td>{i % 3 === 1 ? `${19 + ((seed + i) % 11)}/30` : '—'}</td><td>{i % 4 === 1 ? '5/5' : '—'}</td></tr>)}</tbody></table></div></section>
      </div>
    </div>}
    {activeTab !== 'Academic Profile' && <section className="reference-profile-card reference-profile-other"><h2>{activeTab}</h2>{activeTab === 'Upload Documents' ? <div className="reference-other-list"><p>SSC / 10th Marks Memo <strong>Available</strong></p><p>Intermediate Marks Memo <strong>Available</strong></p><p>Aadhaar / Identity Proof <strong>Available</strong></p><p>Study Certificates <strong>Available</strong></p></div> : activeTab === 'Qualifications' ? <div className="reference-other-list"><p>School <strong>{school}</strong></p><p>Intermediate <strong>{juniorCollege}</strong></p><p>Degree <strong>CMR Institute of Technology</strong></p></div> : activeTab === 'Bank Details' ? <div className="reference-other-list"><p>Account Holder <strong>{student.name}</strong></p><p>Bank Details <strong>Not provided</strong></p><p>Account Number <strong>Not provided</strong></p></div> : <div className="reference-other-list"><p>Academic / Project Achievements <strong>To be updated</strong></p><p>Certificates <strong>To be updated</strong></p></div>}</section>}
  </div>;
}
