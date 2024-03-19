'use client';

import { useState } from 'react';

export const UploadFiles = () => {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      });
      console.log(response);
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={handleFileChange} />
      <button type='submit'>Enviar</button>
    </form>
  );
};
