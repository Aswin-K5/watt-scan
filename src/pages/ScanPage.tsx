
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ScanPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [previousReading, setPreviousReading] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviousReadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 7 characters
    if (/^\d{0,7}$/.test(value)) {
      setPreviousReading(value);
    }
  };

  const handleUpload = () => {
    if (!image) {
      toast.error('Please capture or upload an image first');
      return;
    }

    if (previousReading.length !== 7) {
      toast.error('Please enter a valid 7-digit previous reading');
      return;
    }

    // Store data in sessionStorage to use on calculation page
    sessionStorage.setItem('meterImage', image);
    sessionStorage.setItem('previousReading', previousReading);
    navigate('/calculation');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Capture Meter Reading</h1>
        
        <div className="mb-6">
          <label htmlFor="previousReading" className="block text-gray-700 mb-2 font-medium">
            Previous Meter Reading (7 digits)
          </label>
          <input
            type="text"
            id="previousReading"
            value={previousReading}
            onChange={handlePreviousReadingChange}
            placeholder="Enter previous reading"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg mb-6">
          {image ? (
            <div className="mb-4">
              <img src={image} alt="Captured meter reading" className="max-w-full h-auto rounded" />
            </div>
          ) : (
            <div className="text-center mb-4">
              <p className="text-gray-500 mb-2">No image captured yet</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleCapture}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg"
            >
              Capture Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Upload from Gallery
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            disabled={!image || previousReading.length !== 7}
            className={`px-6 py-3 rounded-lg font-medium ${
              !image || previousReading.length !== 7
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            Continue to Calculation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
