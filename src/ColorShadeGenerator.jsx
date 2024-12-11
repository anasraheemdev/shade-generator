import React, { useState } from 'react';
import Values from 'values.js';
import { Copy, CheckCircle } from 'lucide-react';

const ColorShadeGenerator = () => {
  const [color, setColor] = useState('');
  const [shades, setShades] = useState([]);
  const [error, setError] = useState(false);
  const [copiedShade, setCopiedShade] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const colorShades = new Values(color).all(10);
      setShades(colorShades);
      setError(false);
    } catch (error) {
      setError(true);
      setShades([]);
    }
  };

  const copyToClipboard = (shade) => {
    navigator.clipboard.writeText(`#${shade.hex}`);
    setCopiedShade(`#${shade.hex}`);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedShade(null);
    }, 2000);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">Color Shade Generator</h2>
          
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input 
                    type="text" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter a color (e.g., Green, #00ff00)" 
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                  />
                  <button type="submit" className="btn btn-primary">
                    Generate Shades
                  </button>
                </div>
                {error && (
                  <div className="invalid-feedback">
                    Invalid color input. Try a color name or hex code.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="container">
            <div className="row g-3">
              {shades.map((shade, index) => (
                <div 
                  key={index} 
                  className="col-6 col-md-4 col-lg-3"
                >
                  <div 
                    className="position-relative shadow-sm rounded overflow-hidden"
                    style={{ 
                      backgroundColor: `#${shade.hex}`, 
                      height: '150px',
                    }}
                  >
                    <button 
                      className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center"
                      onClick={() => copyToClipboard(shade)}
                      title="Copy Color"
                    >
                      {copiedShade === `#${shade.hex}` ? (
                        <CheckCircle className="text-success" size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    <div 
                      className="position-absolute bottom-0 start-0 end-0 p-2 text-center"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        color: shade.type === 'tint' ? 'black' : 'white',
                      }}
                    >
                      #{shade.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorShadeGenerator;