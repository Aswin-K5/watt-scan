
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/scan');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Simplify Your Electricity Meter Reading
          </h1>
          <p className="text-lg mb-6">
            MeterEase helps you easily read your electricity meter, calculate your consumption,
            and generate bills in seconds.
          </p>
          <button
            onClick={handleStartNow}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            Start Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/src/assets/meter-reading.jpg"
            alt="Person reading electricity meter"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
