import React from 'react';

const Contact = () => {
    return (
        <div>
            {/* Header Section */}
            <header>
                <div style={styles.navbar}>
                    <h1 style={styles.title}>Search Engine</h1>
                    <nav style={styles.navLinks}>
                        <a href="/" style={styles.link}>Home</a>
                        <a href="/about" style={styles.link}>About Us</a>
                        <a href="/contact" style={styles.link}>Contact</a>
                    </nav>
                </div>
            </header>

            {/* Main Section */}
            <main style={styles.mainContent}>
                <h2>Contact Us</h2>
                {/* Contact Form */}
                <form action="/submit_contact" method="post" style={styles.form}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                        style={styles.input}
                    />

                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        style={styles.input}
                    />

                    <label htmlFor="message" style={styles.label}>Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        required
                        style={styles.textarea}
                    ></textarea>

                    <button type="submit" style={styles.button}>Send Message</button>
                </form>

                {/* Additional Contact Info */}
                <div style={styles.contactInfo}>
                    <h3>Additional Contact Information</h3>
                    <p>Email: dynamo89247@gmail.com</p>
                    <p>Phone: +92307-1649080</p>
                    <p>Address: Air University</p>
                </div>
            </main>

            {/* Footer Section */}
            <footer style={styles.footer}>
                <p>© 2024 Custom Search Engine. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Inline Styles
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
    },
    title: {
        margin: 0,
    },
    navLinks: {
        display: 'flex',
        gap: '1rem',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
    mainContent: {
        padding: '2rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: '0 auto',
    },
    label: {
        marginTop: '1rem',
        textAlign: 'left',
    },
    input: {
        padding: '0.5rem',
        marginTop: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '0.5rem',
        marginTop: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        marginTop: '1rem',
        padding: '0.7rem',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    contactInfo: {
        marginTop: '2rem',
    },
    footer: {
        marginTop: '2rem',
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem',
    },
};

export default Contact;
