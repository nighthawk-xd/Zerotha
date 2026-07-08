import React, { useState, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
    email: (v) => {
        if (!v.trim()) return 'Email is required.';
        if (!EMAIL_REGEX.test(v.trim())) return 'Please enter a valid email address.';
        return '';
    },
    password: (v) => {
        if (!v) return 'Password is required.';
        return '';
    },
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = useCallback((field, value) => {
        const fn = validators[field];
        if (!fn) return '';
        const err = fn(value);
        setFieldErrors((p) => ({ ...p, [field]: err }));
        return err;
    }, []);

    const handleBlur = useCallback((field) => {
        setTouched((p) => ({ ...p, [field]: true }));
        const vals = { email, password };
        validateField(field, vals[field]);
    }, [email, password, validateField]);

    const handleSubmit = async () => {
        setError('');
        const errors = {
            email: validators.email(email),
            password: validators.password(password),
        };
        setFieldErrors(errors);
        setTouched({ email: true, password: true });
        const firstErr = Object.values(errors).find((x) => x);
        if (firstErr) { setError(firstErr); return; }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.errors) setFieldErrors((p) => ({ ...p, ...data.errors }));
                throw new Error(data.message || 'Login failed.');
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
                        <h2 style={styles.brandTitle}>Welcome back to Zerodha</h2>
                        <p style={styles.brandSubtitle}>
                            Track your portfolio, place trades, and manage your investments — all from one powerful dashboard.
                        </p>
                        <div style={styles.stats}>
                            <div style={styles.stat}><span style={styles.statNumber}>1.5 Cr+</span><span style={styles.statLabel}>Active clients</span></div>
                            <div style={styles.stat}><span style={styles.statNumber}>₹0</span><span style={styles.statLabel}>Equity delivery</span></div>
                            <div style={styles.stat}><span style={styles.statNumber}>₹20</span><span style={styles.statLabel}>Per F&O trade</span></div>
                        </div>
                    </div>
                </div>
                <div style={styles.rightPanel}>
                    <div style={styles.formWrapper}>
                        <h2 style={styles.formTitle}>Log in to your account</h2>
                        <p style={styles.formSubtitle}>Don't have an account? <a href="/signup" style={styles.link}>Sign up free</a></p>
                        {error && <div style={styles.errorBox}><span style={styles.errorIcon}>⚠</span>{error}</div>}
                        <div style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email Address</label>
                                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (touched.email) validateField('email', e.target.value); }} onBlur={() => handleBlur('email')} placeholder="you@example.com" style={iStyle('email')} />
                                {touched.email && fieldErrors.email && <span style={styles.fieldError}>{fieldErrors.email}</span>}
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.passwordWrapper}>
                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (touched.password) validateField('password', e.target.value); }} onBlur={() => handleBlur('password')} placeholder="Enter your password" style={{ ...iStyle('password'), paddingRight: '48px' }} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn} tabIndex={-1}>{showPassword ? '🙈' : '👁'}</button>
                                </div>
                                {touched.password && fieldErrors.password && <span style={styles.fieldError}>{fieldErrors.password}</span>}
                            </div>
                            <button type="button" onClick={handleSubmit} disabled={loading} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                                {loading ? <span style={styles.spinner}></span> : 'Log In'}
                            </button>
                        </div>
                        <p style={styles.terms}>Protected by industry-standard encryption. <a href="/support" style={styles.link}>Need help?</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)', padding: '40px 20px' },
    container: { display: 'flex', width: '100%', maxWidth: '960px', minHeight: '520px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)' },
    leftPanel: { flex: '1', background: 'linear-gradient(135deg, #1a3c6e 0%, #387ed1 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' },
    brandContent: { maxWidth: '320px' },
    logo: { width: '140px', marginBottom: '28px', filter: 'brightness(0) invert(1)' },
    brandTitle: { fontSize: '1.75rem', fontWeight: '600', lineHeight: '1.35', margin: '0 0 14px' },
    brandSubtitle: { fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.85, marginBottom: '28px' },
    stats: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
    stat: { display: 'flex', flexDirection: 'column', gap: '2px' },
    statNumber: { fontSize: '1.3rem', fontWeight: '700' },
    statLabel: { fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' },
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
    submitBtn: { width: '100%', padding: '13px', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', color: '#fff', background: 'linear-gradient(135deg, #387ed1 0%, #2563a8 100%)', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: '0 4px 14px rgba(56, 126, 209, 0.35)' },
    spinner: { display: 'inline-block', width: '20px', height: '20px', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' },
    terms: { fontSize: '0.78rem', color: '#adb5bd', textAlign: 'center', marginTop: '20px', lineHeight: '1.5' },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default Login;
