import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutDashboard, Radio, Star, BriefcaseBusiness, GraduationCap, SquarePen, FileText, CreditCard, CalendarDays, BookOpen, Code2, Shield, UserRound, LogOut, MessageSquare, ChevronRight, Menu, X, CheckCircle2, Upload, BusFront, ClipboardCheck, Bell, MapPin, Pin, UserCog, Users, Check, Clock3 } from 'lucide-react';
import './style.css';
import StudentProfile from './components/StudentProfile.jsx';

// Demo-only accounts. For production, move authentication and approvals to a secured backend.
const students = [
  { roll: '24R01A6620', mobile: '8008803379', name: 'Druthi Gouni', password: 'Druthi@20', branch: 'CSM-A', year: '3-2', email: 'druthi.gouni@gmail.com', phone: '8008803379', parentName: 'Gouni Doulaih', parentPhone: '9441424145', parentEmail: 'doulaih.gouni@gmail.com', address: 'Kandlakoya, Medchal, Telangana', dob: '12 January 2007', gender: 'Female' },
  { roll: '24R01A6601', mobile: '9000000001', name: 'Rahul Kumar', password: '123456', branch: 'CSM-A', year: '3-2', email: 'rahul.kumar@gmail.com', phone: '9000000001' },
  { roll: '24R01A6602', mobile: '9000000002', name: 'Priya Sharma', password: '123456', branch: 'CSM-A', year: '3-2', email: 'priya.sharma@gmail.com', phone: '9000000002' },
  { roll: '24R01A6603', mobile: '9000000003', name: 'Ananya Reddy', password: '123456', branch: 'CSM-A', year: '3-2', email: 'ananya.reddy@gmail.com', phone: '9000000003' },
  { roll: '24R01A6614', mobile: '9346098128', name: 'Sai Kiran Dellapurlolu', password: 'Saikiran@14', branch: 'CSM-A', year: '3-2', email: 'saikiran.dellapurlolu@gmail.com', phone: '9346098128', parentName: 'Mallesh Dellapurlolu', parentPhone: '9989957150', parentEmail: 'xyz@gmail.com', dob: '20 April 2006', gender: 'Male' },
  { roll: '24R01A6664', mobile: '7416365949', name: 'Yarllagada Grishmitha', password: 'Grishmitha@64', branch: 'CSM-A', year: '3-2', email: 'grishmitha.yarllagada@gmail.com', phone: '7416365949' },
  { roll: '24R01A6631', mobile: '6303714142', name: 'Kulkarni Samiksha', password: 'Samiksha@31', branch: 'CSM-A', year: '3-2', email: 'samiksha.kulkarni@gmail.com', phone: '6303714142' },
  { roll: '24R01A6605', mobile: '9573469911', name: 'Akshitha', password: 'Akshitha@05', branch: 'CSM-A', year: '3-2', email: 'akshitha@gmail.com', phone: '9573469911' },
  { roll: '24R01A6647', mobile: '8522981807', name: 'Ponna Spandana', password: 'Spandana@47', branch: 'CSM-A', year: '3-2', email: 'spandana.ponna@gmail.com', phone: '8522981807' },
  { roll: '24R01A6631', mobile: '9640442548', name: 'Sathya', password: 'Sathya@32', branch: 'CSM-A', year: '3-2', email: 'sathya@gmail.com', phone: '9640442548' },
  { roll: '24R01A6620', mobile: '7337241588', name: 'Damera Swapnika', password: 'Swapnika@13', branch: 'CSM-A', year: '3-2', email: 'swapnika.damera@gmail.com', phone: '7337241588' }
];
const staffAccounts = [
  { id: 'MENTOR1', mobile: '9100000001', name: 'Shanthi Bimmari', role: 'mentor1', password: '12012007' },
  { id: 'MENTOR2', mobile: '9100000002', name: 'Dr. K. Sampath', role: 'mentor2', password: '12012007' },
  { id: 'MENTOR3', mobile: '9100000003', name: 'Annapoorna Basodi', role: 'mentor3', password: '12012007' },
  { id: 'HOD', mobile: '9100000004', name: 'Dr Pilla Srinivas', role: 'hod', password: '20042006' },
  { id: 'DIRECTOR', mobile: '9100000005', name: 'Janga Reddy Madireddy', role: 'director', password: '20042006' }
];
const navItems = [
  { label: 'Home', Icon: LayoutDashboard, page: 'Dashboard' }, { label: 'Feed', Icon: Radio, page: 'Announcements' },
  { label: 'Activity Portfolio', Icon: Star, page: 'Favorites' }, { label: 'Placements', Icon: BriefcaseBusiness, page: 'Placements' },
  { label: 'Academics', Icon: GraduationCap, page: 'Academics' }, { label: 'Exams', Icon: SquarePen, page: 'Assignments' },
  { label: 'Documents', Icon: FileText, page: 'Documents' }, { label: 'Fees', Icon: CreditCard, page: 'Fees' },
  { label: 'Calendar', Icon: CalendarDays, page: 'Calendar' }, { label: 'Library', Icon: BookOpen, page: 'Library' },
  { label: 'Lab', Icon: Code2, page: 'Projects' }, { label: 'Change Password', Icon: Shield, page: 'Security' }
];
const readStore = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const getMentorForRoll = (rollNumber) => {
  const digits = String(rollNumber || '').replace(/\D/g, '');
  const lastTwo = Number(digits.slice(-2));
  if (lastTwo >= 1 && lastTwo <= 26) return 'mentor1';
  if (lastTwo >= 27 && lastTwo <= 48) return 'mentor2';
  if (lastTwo >= 49 && lastTwo <= 66) return 'mentor3';
  return 'mentor1';
};
const roleLabel = (role) => ({
  student: 'Student',
  mentor1: 'Mentor 1 · Shanthi Bimmari',
  mentor2: 'Mentor 2 · Dr. K. Sampath',
  mentor3: 'Mentor 3 · Annapoorna Basodi',
  hod: 'HOD · Dr Pilla Srinivas',
  director: 'Director · Janga Reddy Madireddy'
}[role] || 'Student');

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loginRole, setLoginRole] = useState('student');
  const [loginStep, setLoginStep] = useState('roll');
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [page, setPage] = useState('Dashboard');
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [requests, setRequests] = useState(() => readStore('dhondi-v12-requests', []));
  const [profiles, setProfiles] = useState(() => readStore('dhondi-v7-profiles', {}));
  const [type, setType] = useState(''); const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [reason, setReason] = useState(''); const [file, setFile] = useState(null);
  const [toast, setToast] = useState(''); const [clock, setClock] = useState(new Date()); const [hostel, setHostel] = useState(false);
  const [profileDraft, setProfileDraft] = useState({});
  useEffect(() => { const id = setInterval(() => setClock(new Date()), 1000); return () => clearInterval(id); }, []);
  useEffect(() => { localStorage.setItem('dhondi-v12-requests', JSON.stringify(requests)); }, [requests]);
  useEffect(() => { localStorage.setItem('dhondi-v7-profiles', JSON.stringify(profiles)); }, [profiles]);
  const foundStudent = students.find(s => s.mobile === roll.trim());
  const foundStaff = staffAccounts.find(s => s.mobile === roll.trim());
  const foundAccount = foundStudent || foundStaff;
  const detectedRole = foundStudent ? 'student' : (foundStaff?.role || null);
  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const checkRoll = (e) => {
    e.preventDefault();
    if (foundAccount) { setLoginRole(detectedRole); setLoginStep('password'); setLoginError(''); }
    else setLoginError('Mobile number not registered. Please check the number or contact the administrator.');
  };
  const signIn = (e) => {
    e.preventDefault();
    const account = foundAccount;
    if (account && account.password === password) {
      const user = detectedRole === 'student' ? { ...account, ...(profiles[account.mobile] || {}), role: 'student' } : account;
      setLoggedIn(user); setPage('Dashboard'); setLoginError(''); setSidebarPinned(false);
      setProfileDraft({ ...user });
    } else setLoginError('Incorrect password. Please try again.');
  };
  const go = (label) => { setPage(label); setHostel(false); setMobileNav(false); if (label === 'Profile' && loggedIn) setProfileDraft({ ...loggedIn, ...(profiles[loggedIn.mobile] || {}) }); };
  const logout = () => { setLoggedIn(null); setLoginStep('roll'); setRoll(''); setPassword(''); setLoginRole('student'); setPage('Dashboard'); setSidebarPinned(false); };
  const submitPermission = (e) => {
    e.preventDefault();
    if (!type || !date || !time || !reason.trim()) { notify('Please fill all required fields.'); return; }
    const mentor = getMentorForRoll(loggedIn.roll);
    const newReq = { id: Date.now(), roll: loggedIn.roll, studentName: loggedIn.name, studentMobile: loggedIn.mobile, branch: loggedIn.branch, type, date, time, reason: reason.trim(), fileName: file?.name || '', createdAt: new Date().toISOString(), mentor, stage: mentor, status: 'Pending', history: [] };
    setRequests(prev => [newReq, ...prev]); setPage('Permissions'); notify(`Request sent to ${roleLabel(mentor)} for approval.`);
    setType(''); setDate(''); setTime(''); setReason(''); setFile(null);
  };
  const cancelRequest = (requestId) => {
    setRequests(prev => prev.map(req => req.id === requestId && req.roll === loggedIn?.roll && req.status === 'Pending' ? { ...req, status: 'Cancelled', stage: 'cancelled' } : req));
    notify('Permission request cancelled.');
  };
  const formatPermissionDate = (dateValue, timeValue) => {
    if (!dateValue) return '';
    const dateObj = new Date(`${dateValue}T${timeValue || '00:00'}`);
    return dateObj.toLocaleString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  };
  const approveRequest = (requestId) => {
    const currentRole = loggedIn.role;
    setRequests(prev => prev.map(req => {
      if (req.id !== requestId || req.stage !== currentRole) return req;
      let nextStage = 'approved';
      if (currentRole.startsWith('mentor')) nextStage = 'hod';
      else if (currentRole === 'hod') nextStage = 'director';
      const action = { role: currentRole, by: loggedIn.name, action: 'Approved', at: new Date().toISOString() };
      return { ...req, stage: nextStage, status: nextStage === 'approved' ? 'Approved' : 'Pending', history: [...(req.history || []), action] };
    }));
    notify(currentRole === 'director' ? 'Permission fully Approved by Director.' : `Approved. Sent to ${currentRole.startsWith('mentor') ? 'HOD' : 'Director'}.`);
  };
  const pendingForRole = useMemo(() => requests.filter(r => r.stage === loggedIn?.role), [requests, loggedIn]);
  const myRequests = useMemo(() => requests.filter(r => r.roll === loggedIn?.roll), [requests, loggedIn]);
  const saveProfile = (e) => {
    e.preventDefault();
    const updated = { ...loggedIn, ...profileDraft };
    setProfiles(prev => ({ ...prev, [loggedIn.mobile]: updated })); setLoggedIn(updated); notify('Profile updated successfully.');
  };

  if (!loggedIn) return <div className="login-screen"><div className="login-clock">{clock.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</div><div className="login-card"><div className="login-logo"><img src="/cmrit-logo.png" alt="CMRIT logo" /></div><div className="login-eyebrow">CMR INSTITUTE OF TECHNOLOGY</div><h1>PAPER LOGIN</h1>
    {loginStep === 'roll' ? <form onSubmit={checkRoll} className="login-form"><label>MOBILE NUMBER<div className="paper-input"><input autoFocus inputMode="numeric" maxLength={10} value={roll} onChange={e => { setRoll(e.target.value.replace(/\D/g, '').slice(0, 10)); setLoginError(''); }} placeholder="Mobile number" required /></div></label>{loginError && <p className="login-error">{loginError}</p>}<button className="login-primary" type="submit">Continue</button></form> : <form onSubmit={signIn} className="login-form"><div className="number-confirm"><strong>{foundAccount?.mobile}</strong><button type="button" className="change-user" onClick={() => { setLoginStep('roll'); setPassword(''); setLoginError(''); }}>Change Number</button></div><label>Password<div className="paper-input"><input autoFocus type="password" value={password} onChange={e => { setPassword(e.target.value); setLoginError(''); }} placeholder="Password" required /></div><div className="forgot-row"><button type="button" onClick={() => notify('Please contact the administrator to reset your demo password.')}>Forgot Password</button></div></label>{loginError && <p className="login-error">{loginError}</p>}<button className="login-primary" type="submit">Login</button></form>}</div><p className="login-footer">Powered by <strong>DHONDI</strong></p>{toast && <div className="toast">{toast}</div>}</div>;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'open' : ''} ${sidebarPinned ? 'pinned' : ''}`}><div className="brand"><button className="pin-toggle" title={sidebarPinned ? 'Unpin sidebar' : 'Pin sidebar'} onClick={() => setSidebarPinned(prev => !prev)}><Pin size={15} /></button><button className="close-nav" onClick={() => setMobileNav(false)} aria-label="Close sidebar"><X size={17} /></button></div><div className="nav-main">{(loggedIn.role === 'student' ? navItems : [{ label: 'Home', Icon: LayoutDashboard, page: 'Dashboard' }, { label: 'Permission Approvals', Icon: ClipboardCheck, page: 'Permissions' }]).map(({ label, Icon, page: targetPage }) => <button key={label} title={label} className={`nav-icon ${page === targetPage ? 'selected' : ''}`} onClick={() => go(targetPage)}><Icon size={16} /><span className="nav-label">{label}</span></button>)}</div><div className="nav-bottom">{loggedIn.role === 'student' && <button title="Profile" className={`nav-icon ${page === 'Profile' ? 'selected' : ''}`} onClick={() => go('Profile')}><UserRound size={16} /><span className="nav-label">Profile</span></button>}<button title="Logout" className="nav-icon" onClick={logout}><LogOut size={16} /><span className="nav-label">Logout</span></button></div></aside>
    {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)} />}
    <main className="main-area"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={19} /></button><div className="brand-title"><img src="/cmrit-logo.png" alt="CMRIT" className="header-logo" /><b>C M R I T</b><span>{roleLabel(loggedIn.role)}</span></div><div className="topbar-right"><Bell size={15} /><span className="clock">{clock.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span></div></header><div className="breadcrumb"><span onClick={() => go('Dashboard')}>Home</span><ChevronRight size={11} /><span>{page === 'Apply Permission' ? 'Permissions' : page}</span>{page === 'Apply Permission' && <><ChevronRight size={11} /><span>Apply Permission</span></>}</div>
    <section className="page-content">
      {page === 'Dashboard' && loggedIn.role === 'student' ? <><div className="home-welcome"><h1>Hello, {loggedIn.name.toUpperCase()}</h1><div className="home-shortcuts"><button className="outline-btn" onClick={() => go('Transport')}>Transport</button><button className="outline-btn" onClick={() => go('Hostel')}>Hostel</button><button className="outline-btn" onClick={() => go('Permissions')}>Permissions</button><button className="outline-btn" onClick={() => go('My Conduct Record')}>My Conduct Record</button></div></div><div className="fees-grid"><article className="fee-card"><h3>Tuition Fee</h3><strong>B.Tech - 1 Year</strong><p>Last Date: 11 September, 2024 11:59 PM</p><button className="fee-pay" onClick={() => notify('Demo only: payment is not connected.')}>₹ 110000 - Pay now</button><hr /><small>Use this option to split and pay the payment in parts with multiple payment modes if only your card limit for the day or UPI limit is less than the total amount. Please make a note that the complete payment must be done before last date.</small><label>Enter other amount</label><input aria-label="Enter other amount for first fee" placeholder="Enter Other Amount"/><button className="fee-add" onClick={() => notify('Demo amount added.')}>Add</button></article><article className="fee-card"><h3>Tuition Fee</h3><strong>B.Tech - 3 Year [Current]</strong><p>Last Date: 03 August, 2026 11:00 PM</p><button className="fee-pay" onClick={() => notify('Demo only: payment is not connected.')}>₹ 110000 - Pay now</button><hr /><small>Use this option to split and pay the payment in parts with multiple payment modes if only your card limit for the day or UPI limit is less than the total amount. Please make a note that the complete payment must be done before last date.</small><label>Enter other amount</label><input aria-label="Enter other amount for current fee" placeholder="Enter Other Amount"/><button className="fee-add" onClick={() => notify('Demo amount added.')}>Add</button></article><article className="fee-card exam-fee"><h3>Main Exam Application</h3><strong>B.Tech V Semester R24 Regular Examinations November 2026</strong><p>Last Date: 15 October, 2026 11:59 PM</p><hr /><p>Last Date with late fee ₹500 is 17 October, 2026 11:59 PM</p><p>Last Date with late fee ₹1000 is 22 October, 2026 11:59 PM</p><p>Last Date with late fee ₹2000 is 27 October, 2026 11:59 PM</p><span className="applied-label">You have applied! View status</span></article></div></> : null}
      {page === 'Dashboard' && loggedIn.role !== 'student' && <div className="portal-heading"><div className="service-icon green"><UserCog size={27} /></div><div><h1>Hello, {loggedIn.name}</h1><p>{roleLabel(loggedIn.role)} portal · Permission approvals only</p></div><div className="approval-count"><strong>{pendingForRole.length}</strong><span>Pending</span></div><button className="outline-btn" onClick={() => go('Permissions')}>View Requests</button></div>}
      {page === 'Permissions' && loggedIn.role === 'student' && <><h1>Permissions</h1><div className="actions permission-actions"><button className="outline-btn" onClick={() => go('Apply Permission')}>Apply Permission</button><button className="outline-btn" onClick={() => go('Hostel')}>Hostel Permission</button></div><div className="permission-grid student-permission-grid">{myRequests.map(r => { const approvedFor = (role) => (r.history || []).some(h => h.role === role && h.action === 'Approved'); const mentorName = roleLabel(r.mentor).replace(/^Mentor \d+ · /, ''); const cancelled = r.status === 'Cancelled'; return <article className="permission-card student-permission-card" key={r.id}><div className="card-title">{r.type} applied for {formatPermissionDate(r.date, r.time)}</div><p className="request-body permission-reason">{r.reason}</p><div className="status-line"><span className={`status ${r.status === 'Approved' ? 'approved' : cancelled ? 'waiting' : 'pending'}`}>{r.status === 'Approved' ? 'Approved' : cancelled ? 'Cancelled' : 'Pending'}</span>{r.status === 'Pending' && <><span className="status-separator">|</span><button className="cancel-request" onClick={() => cancelRequest(r.id)}>Cancel</button></>}</div><div className="approval-list">{[{key:r.mentor,label:mentorName},{key:'hod',label:'Dr Pilla Srinivas'},{key:'director',label:'Janga Reddy Madireddy'},{key:'final',label:'Final Approval'}].map((step) => { const done = step.key === 'final' ? r.status === 'Approved' : approvedFor(step.key); const waiting = !done && !cancelled && (step.key === r.stage || (step.key === 'final' && r.status === 'Approved')); return <div className="approval-row" key={step.key}>{step.label} - <span className={`status ${done ? 'approved' : cancelled ? 'waiting' : 'pending'}`}>{done ? 'Approved' : cancelled ? 'Cancelled' : waiting ? 'Pending' : 'Pending'}</span></div>; })}</div></article>; })}{myRequests.length === 0 && <div className="empty-state"><ClipboardCheck size={30} /><strong>No permission requests yet</strong><p>Click Apply Permission to submit your first request.</p></div>}</div></>}
      {page === 'Permissions' && loggedIn.role !== 'student' && <><h1>Permission Approvals</h1><p className="subheading">{loggedIn.role.startsWith('mentor') ? 'Only requests assigned to your mentor group appear here.' : loggedIn.role === 'hod' ? 'Requests appear here after their assigned mentor approves them.' : 'Requests appear here after HOD approval.'}</p><div className="permission-grid">{pendingForRole.map(r => <article className="permission-card approval-request" key={r.id}><div className="approval-request-top"><div><div className="card-title">{r.studentName}</div><p className="request-body">Roll No: {r.roll} · {r.branch || 'Student'}</p></div><span className="status pending">Pending</span></div><div className="request-detail-grid"><div><small>Permission type</small><strong>{r.type}</strong></div><div><small>Date & time</small><strong>{r.date} · {r.time}</strong></div><div className="reason-detail"><small>Reason</small><strong>{r.reason}</strong></div>{r.fileName && <div><small>Attachment</small><strong>{r.fileName}</strong></div>}</div><div className="approval-route">Approval flow: <b>{roleLabel(r.mentor)}</b><span>→</span><b>HOD</b><span>→</span><b>Director</b></div><button className="approve-btn" onClick={() => approveRequest(r.id)}><Check size={16} /> Approve Permission</button></article>)}{pendingForRole.length === 0 && <div className="empty-state"><ClipboardCheck size={30} /><strong>No pending permissions</strong><p>New requests assigned to this portal will appear here.</p></div>}</div></>}
      {page === 'Apply Permission' && loggedIn.role === 'student' && <><h1>Apply Permission</h1><form className="permission-form" onSubmit={submitPermission}><h2>Fill the form to apply for a permission...</h2><label>Type of Permission<select value={type} onChange={e => setType(e.target.value)} required><option value="">Select</option><option>Early Permission</option><option>Leave Permission</option><option>Late Permission</option><option>Outing Permission</option><option>Other</option></select></label><div className="form-row"><label>Date<input type="date" value={date} onChange={e => setDate(e.target.value)} required /></label><label>Time<input type="time" value={time} onChange={e => setTime(e.target.value)} required /></label></div><label>Reason<textarea placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} required rows="4" /></label><label>Supported Document (PDF only)<span className="file-control"><input type="file" accept="application/pdf,.pdf" onChange={e => setFile(e.target.files?.[0] || null)} /><Upload size={15} /></span>{file && <small className="file-name">{file.name}</small>}</label><p className="routing-note">Your roll number {loggedIn.roll} routes this request to <strong>{roleLabel(getMentorForRoll(loggedIn.roll))}</strong>, then HOD, then Director.</p><div className="form-actions"><button className="proceed-btn" type="submit">Submit Permission</button></div></form></>}
      {page === 'Profile' && loggedIn.role === 'student' && <StudentProfile student={{ ...loggedIn, ...(profiles[loggedIn.mobile] || {}) }} />}
      {page === 'Transport' && <><h1>Transport</h1><div className="transport-panel"><div className="service-icon green"><BusFront size={27} /></div><h2>Student Transport</h2><p>Transport information and bus route details will be available here.</p><div className="transport-info"><MapPin size={17} /> CMRIT Campus · Kandlakoya, Medchal</div></div></>}
      {page !== 'Dashboard' && page !== 'Permissions' && page !== 'Apply Permission' && page !== 'Profile' && page !== 'Transport' && <><h1>{page}</h1><div className="placeholder-page"><div className="placeholder-icon"><LayoutDashboard size={28} /></div><h2>{page}</h2><p>This section is a visual placeholder. Permission approvals and student profile are available in this version.</p><button className="outline-btn" onClick={() => go('Dashboard')}>Back to Home</button></div></>}
    </section><footer>Powered By <strong>DHONDI</strong></footer></main><button className="chat-button" title="Chat" onClick={() => notify('Student help chat will be added later.')}><MessageSquare size={20} /></button>{toast && <div className="toast"><CheckCircle2 size={17} />{toast}</div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
