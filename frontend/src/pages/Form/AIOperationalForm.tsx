import React, { useState, useEffect } from 'react';

const VortexContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    company: '',
    website: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const speed = Math.random() * 0.5;
        const x = (e.clientX * speed) / 100;
        const y = (e.clientY * speed) / 100;
        
        (particle as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'Arial', sans-serif",
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)',
      minHeight: '100vh',
      color: 'white',
      overflowX: 'hidden'
    }}>
      <div className="grid-background" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 
          'linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }}></div>
      
      <div className="floating-particles" style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle" style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            left: `${(i + 1) * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}></div>
        ))}
      </div>

      <div className="container" style={{
        position: 'relative',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div className="header" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="logo" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div className="logo-icon" style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              position: 'relative',
              animation: 'rotate 10s linear infinite'
            }}>
              <div style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%)',
                borderRadius: '50%'
              }}></div>
            </div>
            <div className="logo-text" style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>VORTEX</div>
          </div>
          <div className="subtitle" style={{
            fontSize: '1.1rem',
            color: '#a0a0a0',
            marginBottom: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>AI Operations</div>
          <div className="enterprise-badge" style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>Enterprise Ready</div>
        </div>

        <h1 className="main-heading" style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          lineHeight: '1.3',
          margin: '30px 0 20px 0',
          textAlign: 'center'
        }}>
          Vortex AI is enabling large distributed operations teams to create <span className="highlight" style={{
            background: 'linear-gradient(45deg, #3a86ff, #06ffa5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>5x impact</span>
        </h1>

        <p className="description" style={{
          textAlign: 'center',
          color: '#b0b0b0',
          marginBottom: '40px',
          lineHeight: '1.5'
        }}>
          Share your contact details with us and learn how Vortex AI can help you get to the next level.
        </p>

        <div className="form-container" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input 
                type="text" 
                name="name"
                placeholder="Enter Your Name" 
                required
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input 
                type="email" 
                name="email"
                placeholder="Enter Your Business Email" 
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter Your Phone Number" 
                required
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="form-row" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <input 
                  type="text" 
                  name="designation"
                  placeholder="Designation" 
                  required
                  value={formData.designation}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Company" 
                  required
                  value={formData.company}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <input 
                type="url" 
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              style={{
                width: '100%',
                padding: '18px',
                border: 'none',
                borderRadius: '50px',
                background: submitted 
                  ? 'linear-gradient(45deg, #06ffa5, #3a86ff)' 
                  : 'linear-gradient(45deg, #3a86ff, #06ffa5)',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
            >
              {submitted ? 'Submitted!' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(100vh) scale(0); }
          50% { transform: translateY(-10px) scale(1); }
        }
        
        @media (max-width: 600px) {
          .container {
            padding: 15px !important;
          }
          
          .form-container {
            padding: 20px !important;
          }
          
          .form-row {
            flex-direction: column !important;
            gap: 0 !important;
          }
          
          .logo-text {
            font-size: 2rem !important;
          }
          
          .main-heading {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '18px 20px',
  borderRadius: '50px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
};

export default VortexContactForm;