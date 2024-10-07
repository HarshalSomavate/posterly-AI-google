"use client";
import React, { useState } from 'react';
import './style-poster.css'; // Ensure your styles are imported
import { FloatingDockDemo } from '../nav-bar';

function Poster() {
  const [theme, setTheme] = useState('');
  const [textShow, setTextShow] = useState('');
  const [discount, setDiscount] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Start loading
    setError('');  // Clear any previous error

    const formData = new FormData();
    formData.append('theme', theme);
    formData.append('text_show', textShow);
    formData.append('discount', discount);
    formData.append('color', colorPalette);

    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);

    try {
      const response = await fetch('http://localhost:8080/api/generate-banner', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setBannerUrl(data.banner_url);  // Set the banner image URL from response
      } else {
        setError(data.error || 'Error generating banner');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate banner');
    }

    setLoading(false);  // Stop loading
  };

  const handleImagePreview = (imageFile: File | null) => {
    return imageFile ? URL.createObjectURL(imageFile) : '';
  };

  return (
    <div className="container">
      <FloatingDockDemo/>
      <h1>Generate Sale Banner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Theme:
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required />
        </label>
        <label>
          Text to Show:
          <input type="text" value={textShow} onChange={(e) => setTextShow(e.target.value)} required />
        </label>
        <label>
          Discount Information:
          <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
        </label>
        <label>
          Color Palette:
          <input type="text" value={colorPalette} onChange={(e) => setColorPalette(e.target.value)} required />
        </label>
        <label>
          Upload Image 1:
          <input type="file" onChange={(e) => setImage1(e.target.files ? e.target.files[0] : null)} />
        </label>
        {image1 && <img src={handleImagePreview(image1)} alt="Preview" className="preview-image" />}
        <label>
          Upload Image 2:
          <input type="file" onChange={(e) => setImage2(e.target.files ? e.target.files[0] : null)} />
        </label>
        {image2 && <img src={handleImagePreview(image2)} alt="Preview" className="preview-image" />}
        <label>
          Upload Image 3:
          <input type="file" onChange={(e) => setImage3(e.target.files ? e.target.files[0] : null)} />
        </label>
        {image3 && <img src={handleImagePreview(image3)} alt="Preview" className="preview-image" />}

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Banner'}
        </button>
      </form>

      {/* Show loading spinner if in loading state */}
      {loading && <div className="loading-spinner"></div>}

      {error && <p className="error-message">{error}</p>}

      {bannerUrl && (
        <div className="generated-banner-container">
          <h2>Generated Banner</h2>
          <img src={`http://localhost:8080/${bannerUrl}`} alt="Generated Banner" />
          <a href={`http://localhost:8080/${bannerUrl}`} download className="download-button">
            Download Banner
          </a>
        </div>
      )}
    </div>
  );
}

export default Poster;
