import React from 'react';

const HowToUse = () => (
  <div className="max-w-3xl mx-auto p-8 text-white bg-gray-900 rounded-lg shadow-lg mt-10 mb-10">
    <h1 className="text-3xl font-bold mb-6 text-blue-400">How to Use</h1>
    <p className="mb-4">
      Our tool is user friendly and easy to navigate through. The user can upload the planet’s data through two methods by navigating to the Calculate habitability section:
    </p>
    <ul className="list-disc list-inside mb-4">
      <li className="mb-2"><b>Uploading a CSV file:</b> The user is required to organise the data in a particular format. It can then be uploaded into the application using the “UPLOAD CSV” button.</li>
      <li className="mb-2"><b>Filling the data manually:</b> The user can also fill the planet’s data into the space provided manually. Kindly keep in mind the units.</li>
    </ul>
    <p className="mb-4">
      Once the input is given, the model will take a few seconds to analyse and give its results. The model gives the output in the form of percentage which is a direct representation of the habitability of the planet.
    </p>
    <p className="mb-4 font-semibold text-yellow-300">
      NOTE: If any data field is empty it can affect the accuracy of the model’s result.
    </p>
  </div>
);

export default HowToUse; 