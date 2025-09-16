const SectionCard = ({ title, type, description, image }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">
      {image && <img src={image} alt="Illustration" className="mb-2 rounded" />}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Type: {type}</p>
      {description && <p className="mt-1 text-gray-700">{description}</p>}
      <div className="mt-4 flex space-x-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded">Modifier</button>
        <button className="px-3 py-1 bg-red-500 text-white rounded">Suppr.</button>
      </div>
    </div>
  );
};

export default SectionCard;
