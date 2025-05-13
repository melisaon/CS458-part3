import React, { useState } from 'react';

const aiModels = ['ChatGPT', 'Bard', 'Claude', 'Copilot'];

const SurveyScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [gender, setGender] = useState('');
  const [aiModelType, setAiModelType] = useState('');
  const [prosCons, setProsCons] = useState('');
  const [beneficialUseCase, setBeneficialUseCase] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const isValidDate = (dateString: string): boolean =>
    /^\d{4}[/.]\d{2}[/.]\d{2}$/.test(dateString);

  const isValidAge = (birthDate: string): boolean => {
    const birth = new Date(birthDate.replace(/[/.]/g, '/'));
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const isValidName = (text: string): boolean => /^[a-zA-Z\s]+$/.test(text);
  const isValidCity = (text: string): boolean => /^[a-zA-Z\s]+$/.test(text);
  const isValidTextLength = (text: string): boolean => text.length >= 10 && text.length <= 250;

  const isFormValid = (): boolean =>
    Boolean(name) &&
    isValidName(name) &&
    Boolean(birthDate) &&
    isValidDate(birthDate) &&
    isValidAge(birthDate) &&
    Boolean(city) &&
    isValidCity(city) &&
    Boolean(educationLevel) &&
    Boolean(gender) &&
    Boolean(aiModelType) &&
    isValidTextLength(prosCons) &&
    isValidTextLength(beneficialUseCase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadySubmitted) return;
    if (!isFormValid()) {
      alert('Please correct the errors before submitting.');
      return;
    }

    const surveyData = {
      name,
      birthDate,
      city,
      educationLevel,
      gender,
      aiModelType,
      prosCons,
      beneficialUseCase,
      selectedModels,
    };

    console.log('Survey Submitted:', surveyData);
    setAlreadySubmitted(true);
    alert('Survey submitted successfully!');
  };

  const toggleModelSelection = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2 data-testid="heading-survey">AI Survey Form</h2>

      <input
        id="input-name"
        data-testid="input-name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {!isValidName(name) && name && (
        <p id="errorNameInvalid" style={{ color: 'red' }}>
          Name must contain only letters and spaces.
        </p>
      )}

      <input
        id="input-birthDate"
        type="text"
        placeholder="Birth Date (YYYY/MM/DD or YYYY.MM.DD)"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      {birthDate && !isValidDate(birthDate) && (
        <p id="errorBirthDateInvalid" style={{ color: 'red' }}>
          Invalid date format.
        </p>
      )}
      {isValidDate(birthDate) && !isValidAge(birthDate) && (
        <p id="errorBirthDateAgeInvalid" style={{ color: 'red' }}>
          You must be at least 18.
        </p>
      )}

      <input
        id="input-city"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {!isValidCity(city) && city && (
        <p id="errorCityInvalid" style={{ color: 'red' }}>
          City must contain only letters and spaces.
        </p>
      )}

      <input
        id="select-educationLevel"
        type="text"
        placeholder="Education Level"
        value={educationLevel}
        onChange={(e) => setEducationLevel(e.target.value)}
      />

      <input
        id="select-gender"
        data-testid="select-gender"
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      <input
        id="select-aiModelType"
        data-testid="select-aiModelType"
        type="text"
        placeholder="AI Model Type (e.g., ChatGPT)"
        value={aiModelType}
        onChange={(e) => setAiModelType(e.target.value)}
      />

      <textarea
        id="input-prosCons"
        data-testid="input-prosCons"
        placeholder="Pros & Cons"
        value={prosCons}
        onChange={(e) => setProsCons(e.target.value)}
      />
      {!isValidTextLength(prosCons) && prosCons && (
        <p id="errorProsConsLength" style={{ color: 'red' }}>
          Must be 10–250 characters.
        </p>
      )}

      <textarea
        id="input-beneficialUseCase"
        data-testid="input-beneficialUseCase"
        placeholder="Most Beneficial Use Case"
        value={beneficialUseCase}
        onChange={(e) => setBeneficialUseCase(e.target.value)}
      />
      {!isValidTextLength(beneficialUseCase) && beneficialUseCase && (
        <p id="errorBeneficialUseCaseLength" style={{ color: 'red' }}>
          Must be 10–250 characters.
        </p>
      )}

      <fieldset>
        <legend>Select AI Models Used</legend>
        {aiModels.map((model) => (
          <label key={model} htmlFor={`checkbox-${model}`} style={{ display: 'block' }}>
            <input
              id={`checkbox-${model}`}
              data-testid={`checkbox-${model}`}
              type="checkbox"
              checked={selectedModels.includes(model)}
              onChange={() => toggleModelSelection(model)}
            />
            {model}
          </label>
        ))}
      </fieldset>

      {alreadySubmitted && (
        <p id="alreadySubmittedMessage" style={{ color: 'green' }}>
          You have already submitted this survey.
        </p>
      )}

      <button
        id="button-submit"
        data-testid="button-submit"
        type="submit"
        disabled={!isFormValid() || alreadySubmitted}
      >
        Submit
      </button>
    </form>
  );
};

export default SurveyScreen;
