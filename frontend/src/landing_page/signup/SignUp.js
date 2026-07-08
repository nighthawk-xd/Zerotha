import React, { useState, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s'.-]+$/;

const validators = {
    name: (v) => {
        if (!v.trim()) return 'Name is required.';
        if (v.trim().length < 2) return 'Name must be at least 2 characters.';
        if (v.trim().length > 50) return 'Name must be at most 50 characters.';
        if (!NAME_REGEX.test(v.trim())) return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        return '';
    },
    email: (v) => {
        if (!v.trim()) return 'Email is required.';
        if (!EMAIL_REGEX.test(v.trim())) return 'Please enter a valid email address.';
        return '';
    },
    password: (v) => {
        if (!v) return 'Password is required.';
        if (v.length < 6) return 'Password must be at least 6 characters.';
        if (!/[a-z]/.test(v)) return 'Must contain a lowercase letter.';
        if (!/[A-Z]/.test(v)) return 'Must contain an uppercase letter.';
        if (!/[0-9]/.test(v)) return 'Must contain a digit.';
        return '';
    },
    confirmPassword: (v, pw) => {
        if (!v) return 'Please confirm your password.';
        if (v !== pw) return 'Passwords do not match.';
        return '';
    },
};

const getStrength = (pw) => {
    if (!pw) return { label: '', color: 'transparent', width: '0%' };
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    if (s <= 2) return { label: 'Weak', color: '#e53935', width: '33%' };
    if (s <= 3) return { label: 'Medium', color: '#fb8c00', width: '66%' };
    return { label: 'Strong', color: '#43a047', width: '100%' };
};

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});

    const strength = getStrength(password);

    const validateField = useCallback((field, value, extra) => {
        const fn = validators[field];
        if (!fn) return '';
        const err = field === 'confirmPassword' ? fn(value, extra) : fn(value);
        setFieldErrors((p) => ({ ...p, [field]: err }));
        return err;
    }, []);

    const handleBlur = useCallback((field) => {
        setTouched((p) => ({ ...p, [field]: true }));
        const vals = { name, email, password, confirmPassword };
        if (field === 'confirmPassword') validateField(field, vals.confirmPassword, vals.password);
        else validateField(field, vals[field]);
        if (field === 'password' && touched.confirmPassword && confirmPassword) {
            validateField('confirmPassword', confirmPassword, password);
        }
    }, [name, email, password, confirmPassword, touched.confirmPassword, validateField]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const errors = {
            name: validators.name(name),
            email: validators.email(email),
            password: validators.password(password),
            confirmPassword: validators.confirmPassword(confirmPassword, password),
        };
        setFieldErrors(errors);
        setTouched({ name: true, email: true, password: true, confirmPassword: true });
        const firstErr = Object.values(errors).find((x) => x);
        if (firstErr) { setError(firstErr); return; }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.errors) setFieldErrors((p) => ({ ...p, ...data.errors }));
                throw new Error(data.message || 'Signup failed.');
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = `${process.env.REACT_APP_DASHBOARD_URL || '/dashboard'}?token=${encodeURIComponent(data.token)}&user=${encodeURIComponent(JSON.stringify(data.user))}`;
        } catch (err) { setError(err.message); }
        finally { setLoading(false); }
    };

    const iStyle = (f) => ({
        ...styles.input,
        borderColor: touched[f] && fieldErrors[f] ? '#e53935' : '#dee2e6',
        boxShadow: touched[f] && fieldErrors[f] ? '0 0 0 2px rgba(229,57,53,0.15)' : 'none',
    });

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.leftPanel}>
                    <div style={styles.brandContent}>
                        <img src="media/logo.svg" alt="Zerodha" style={styles.logo} />
                        <h2 style={styles.brandTitle}>Start your investment journey today</h2>
                        <p style={styles.brandSubtitle}>
                            Join 1.5 crore+ investors and traders. Zero brokerage on equity delivery trades, flat ₹20 intraday & F&O.
                        </p>
                        <div style={styles.features}>
                            <div style={styles.feature}><span style={styles.featureIcon}>📊</span><span>Advanced charting & analytics</span></div>
                            <div style={styles.feature}><span style={styles.featureIcon}>🔒</span><span>Bank-grade security</span></div>
                            <div style={styles.feature}><span style={styles.featureIcon}>⚡</span><span>Lightning fast order execution</span></div>
                        </div>
                    </div>
                </div>
                <div style={styles.rightPanel}>
                    <div style={styles.formWrapper}>
                        <h2 style={styles.formTitle}>Create your account</h2>
                        <p style={styles.formSubtitle}>Already have an account? <a href="/login" style={styles.link}>Log in</a></p>
                        {error && <div style={styles.errorBox}><span style={styles.errorIcon}>⚠</span>{error}</div>}
                        <form onSubmit={handleSubmit} style={styles.form} noValidate>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Full Name</label>
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value); if (touched.name) validateField('name', e.target.value); }} onBlur={() => handleBlur('name')} placeholder="Vishnu Kumar" style={iStyle('name')} autoComplete="name" />
                                {touched.name && fieldErrors.name && <span style={styles.fieldError}>{fieldErrors.name}</span>}
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (touched.email) validateField('email', e.target.value); }} onBlur={() => handleBlur('email')} placeholder="you@example.com" style={iStyle('email')} autoComplete="email" />
                                {touched.email && fieldErrors.email && <span style={styles.fieldError}>{fieldErrors.email}</span>}
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.passwordWrapper}>
                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (touched.password) validateField('password', e.target.value); }} onBlur={() => handleBlur('password')} placeholder="Min. 6 characters" style={{ ...iStyle('password'), paddingRight: '48px' }} autoComplete="new-password" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn} tabIndex={-1}>{showPassword ? '🙈' : '👁'}</button>
                                </div>
                                {password && (
                                    <div style={styles.strengthContainer}>
                                        <div style={styles.strengthTrack}><div style={{ ...styles.strengthBar, width: strength.width, background: strength.color }} /></div>
                                        <span style={{ ...styles.strengthLabel, color: strength.color }}>{strength.label}</span>
                                    </div>
                                )}
                                {touched.password && fieldErrors.password && <span style={styles.fieldError}>{fieldErrors.password}</span>}
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Confirm Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (touched.confirmPassword) validateField('confirmPassword', e.target.value, password); }} onBlur={() => handleBlur('confirmPassword')} placeholder="Re-enter your password" style={iStyle('confirmPassword')} autoComplete="new-password" />
                                {touched.confirmPassword && fieldErrors.confirmPassword && <span style={styles.fieldError}>{fieldErrors.confirmPassword}</span>}
                            </div>
                            <button type="submit" disabled={loading} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                                {loading ? <span style={styles.spinner}></span> : 'Create Account'}
                            </button>
                        </form>
                        <p style={styles.terms}>By creating an account, you agree to our <a href="/support" style={styles.link}>Terms of Service</a> and <a href="/support" style={styles.link}>Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)', padding: '40px 20px' },
    container: { display: 'flex', width: '100%', maxWidth: '960px', minHeight: '580px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)' },
    leftPanel: { flex: '1', background: 'linear-gradient(135deg, #387ed1 0%, #1a3c6e 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' },
    brandContent: { maxWidth: '320px' },
    logo: { width: '140px', marginBottom: '28px', filter: 'brightness(0) invert(1)' },
    brandTitle: { fontSize: '1.75rem', fontWeight: '600', lineHeight: '1.35', margin: '0 0 14px' },
    brandSubtitle: { fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.85, marginBottom: '28px' },
    features: { display: 'flex', flexDirection: 'column', gap: '14px' },
    feature: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', opacity: 0.9 },
    featureIcon: { fontSize: '1.2rem' },
    rightPanel: { flex: '1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' },
    formWrapper: { width: '100%', maxWidth: '360px' },
    formTitle: { fontSize: '1.6rem', fontWeight: '700', color: '#1a1a2e', margin: '0 0 6px' },
    formSubtitle: { fontSize: '0.9rem', color: '#6c757d', marginBottom: '24px' },
    link: { color: '#387ed1', textDecoration: 'none', fontWeight: '500' },
    errorBox: { background: '#fff3f3', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '10px 14px', marginBottom: '18px', fontSize: '0.85rem', color: '#c62828', display: 'flex', alignItems: 'center', gap: '8px' },
    errorIcon: { fontSize: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '18px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '0.8rem', fontWeight: '600', color: '#495057', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: { width: '100%', padding: '12px 14px', border: '1.5px solid #dee2e6', borderRadius: '8px', fontSize: '0.95rem', color: '#212529', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box', background: '#f8f9fa' },
    passwordWrapper: { position: 'relative' },
    eyeBtn: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', padding: '0', lineHeight: '1' },
    fieldError: { fontSize: '0.78rem', color: '#e53935', marginTop: '2px', lineHeight: '1.3' },
    strengthContainer: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' },
    strengthTrack: { flex: 1, height: '4px', background: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' },
    strengthBar: { height: '100%', borderRadius: '2px', transition: 'width 0.3s ease, background 0.3s ease' },
    strengthLabel: { fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.3px', minWidth: '48px' },
    submitBtn: { width: '100%', padding: '13px', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', color: '#fff', background: 'linear-gradient(135deg, #387ed1 0%, #2563a8 100%)', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: '0 4px 14px rgba(56, 126, 209, 0.35)' },
    spinner: { display: 'inline-block', width: '20px', height: '20px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' },
    terms: { fontSize: '0.78rem', color: '#adb5bd', textAlign: 'center', marginTop: '20px', lineHeight: '1.5' },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 768px) {
    .signup-section > div > div:first-child { display: none !important; }
    .signup-section > div { max-width: 480px !important; }
  }
`;
document.head.appendChild(styleSheet);

export default SignUp;