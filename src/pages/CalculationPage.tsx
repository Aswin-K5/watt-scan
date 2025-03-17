
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

const CalculationPage = () => {
  const [meterImage, setMeterImage] = useState<string | null>(null);
  const [previousReading, setPreviousReading] = useState<string>('');
  const [currentReading, setCurrentReading] = useState<string>('');
  const [consumption, setConsumption] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [calculationDone, setCalculationDone] = useState<boolean>(false);

  // Rate per unit (kWh)
  const RATE_PER_UNIT = 0.12;

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedImage = sessionStorage.getItem('meterImage');
    const storedPreviousReading = sessionStorage.getItem('previousReading');
    
    if (storedImage) {
      setMeterImage(storedImage);
    }
    
    if (storedPreviousReading) {
      setPreviousReading(storedPreviousReading);
    }
  }, []);

  const handleCurrentReadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 7 characters
    if (/^\d{0,7}$/.test(value)) {
      setCurrentReading(value);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const calculateConsumption = () => {
    if (!currentReading || currentReading.length !== 7) {
      toast.error('Please enter a valid 7-digit current reading');
      return;
    }

    const prev = parseInt(previousReading, 10);
    const current = parseInt(currentReading, 10);

    if (current < prev) {
      toast.error('Current reading cannot be less than previous reading');
      return;
    }

    const consumptionUnits = current - prev;
    setConsumption(consumptionUnits);
    setCalculationDone(true);
    toast.success('Consumption calculated successfully!');
  };

  const generateBill = () => {
    if (!consumption || !phoneNumber) {
      toast.error('Please calculate consumption and enter a phone number first');
      return;
    }

    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add content to the PDF
    doc.setFontSize(22);
    doc.text('MeterEase - Electricity Bill', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Bill Details', 20, 40);
    
    // Get current date and due date (1 month from now)
    const currentDate = new Date();
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    doc.text(`Issue Date: ${formatDate(currentDate)}`, 20, 50);
    doc.text(`Due Date: ${formatDate(dueDate)}`, 20, 60);
    doc.text(`Previous Reading: ${previousReading}`, 20, 70);
    doc.text(`Current Reading: ${currentReading}`, 20, 80);
    doc.text(`Consumption Units: ${consumption} kWh`, 20, 90);
    doc.text(`Rate per Unit: $${RATE_PER_UNIT.toFixed(2)}`, 20, 100);
    doc.text(`Amount Due: $${(consumption * RATE_PER_UNIT).toFixed(2)}`, 20, 110);
    
    // Save the PDF
    doc.save('MeterEase_Bill.pdf');
    
    // Simulate sending SMS
    toast.success(`SMS notification sent to ${phoneNumber}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Calculate Consumption</h1>
        
        {meterImage && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Your Meter Image</h2>
            <img src={meterImage} alt="Meter reading" className="max-w-full h-auto rounded-lg border border-gray-300" />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Previous Reading</label>
            <input
              type="text"
              value={previousReading}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Current Reading</label>
            <input
              type="text"
              value={currentReading}
              onChange={handleCurrentReadingChange}
              placeholder="Enter current reading"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mb-8 flex justify-center">
          <button
            onClick={calculateConsumption}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Calculate Consumption
          </button>
        </div>
        
        {calculationDone && consumption !== null && (
          <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold text-primary mb-4">Results</h2>
            
            <div className="mb-4">
              <p className="text-lg">
                <span className="font-medium">Consumption:</span> {consumption} kWh
              </p>
              <p className="text-lg">
                <span className="font-medium">Estimated Cost:</span> ${(consumption * RATE_PER_UNIT).toFixed(2)}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Enter Phone Number for SMS Notification</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <button
              onClick={generateBill}
              disabled={!phoneNumber}
              className={`w-full py-3 rounded-lg font-medium ${
                !phoneNumber
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
            >
              Generate Bill PDF & Send SMS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationPage;
