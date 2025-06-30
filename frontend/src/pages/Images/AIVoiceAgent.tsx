import React, { useState, useRef } from 'react';
import { Play, Pause, Download } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  role: string;
  emoji: string;
  text: string;
  color: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Translations {
  [key: string]: {
    [characterId: string]: string;
  };
}

const VoiceAgentInterface: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const languages: Language[] = [
    { code: 'en', name: 'ENGLISH', flag: '🇺🇸' },
    { code: 'hi', name: 'HINDI', flag: '🇮🇳' },
    { code: 'ta', name: 'TAMIL', flag: '🇮🇳' }
  ];

  // Characters from the document only
  const characters: Character[] = [
    {
      id: 'jessica',
      name: 'Jessica',
      role: 'Narrate a story',
      emoji: '🌸',
      text: "In the ancient land of Eldoria, where the skies glowed with magical colors and the forests whispered old secrets, lived a dragon named Zephyros. Unlike the scary dragons told in stories, Zephyros was wise and kind. People who knew about him respected and admired him.",
      color: '#ff6b6b'
    },
    {
      id: 'brian',
      name: 'Brian',
      role: 'Record an ad',
      emoji: '🍵',
      text: "AromaBrew doesn't just make coffee --- it creates moments. From the first aroma to the last sip, it's the boost I need to take on the day.",
      color: '#4ecdc4'
    },
    {
      id: 'alice',
      name: 'Alice',
      role: 'Help a customer',
      emoji: '🤝',
      text: "Thank you for contacting PostPilot support. I understand you're having trouble with your voice synthesis project. Don't worry --- we're here to help. Could you please share your account email and explain the specific issue you're facing? This will help us solve the problem more quickly.",
      color: '#45b7d1'
    },
    {
      id: 'bill',
      name: 'Bill',
      role: 'Speak different languages',
      emoji: '🌍',
      text: "English has the most words, with over 170,000 in the Oxford English Dictionary. Le français est connu pour sa sonorité mélodieuse et ses expressions romantiques. Deutsch ist berühmt für seine zusammengesetzten Wörter, wie Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz. 日本語は、複雑な表記システムと独特の敬語体系で知られています。 Polski słynie z językołamców i zbitek spółgłoskowych, jak szczęście. اردو اپنے فارسی عربی رسم الخط اور شاعرانہ روایت کی وجہ سے مشہور ہے۔",
      color: '#96ceb4'
    },
    {
      id: 'charlie',
      name: 'Charlie',
      role: 'Lead a meditation',
      emoji: '🧘',
      text: "Take a deep breath in... and gently exhale... Remember --- focus on your breath. Listen to the soft, ambient sounds of the evening as they wrap around you, bringing calm and stillness.",
      color: '#feca57'
    }
  ];

  // Translations for Hindi and Tamil
  const translations: Translations = {
    hi: {
      jessica: "प्राचीन एल्डोरिया की भूमि में, जहाँ आकाश जादुई रंगों से चमकता था और जंगल पुराने रहस्यों की फुसफुसाहट करते थे, ज़ेफिरोस नाम का एक ड्रैगन रहता था। कहानियों में बताए गए डरावने ड्रैगनों के विपरीत, ज़ेफिरोस बुद्धिमान और दयालु था। जो लोग उसके बारे में जानते थे, वे उसका सम्मान और प्रशंसा करते थे।",
      brian: "एरोमाब्रू सिर्फ कॉफी नहीं बनाता --- यह पलों का निर्माण करता है। पहली सुगंध से आखिरी घूंट तक, यह वह ऊर्जा है जिसकी मुझे दिन को संभालने के लिए आवश्यकता है।",
      alice: "पोस्टपायलट सपोर्ट से संपर्क करने के लिए धन्यवाद। मैं समझती हूँ कि आपको अपने वॉयस सिंथेसिस प्रोजेक्ट में समस्या हो रही है। चिंता न करें --- हम यहाँ मदद के लिए हैं। क्या आप कृपया अपना खाता ईमेल साझा कर सकते हैं और उस विशिष्ट समस्या के बारे में बता सकते हैं जिसका आप सामना कर रहे हैं? इससे हमें समस्या को और जल्दी हल करने में मदद मिलेगी।",
      bill: "अंग्रेजी में सबसे अधिक शब्द हैं, ऑक्सफोर्ड इंग्लिश डिक्शनरी में 170,000 से अधिक। फ्रेंच अपनी मधुर ध्वनि और रोमांटिक अभिव्यक्तियों के लिए प्रसिद्ध है। जर्मन अपने संयुक्त शब्दों के लिए प्रसिद्ध है। जापानी अपनी जटिल लेखन प्रणाली और अनूठी सम्मानजनक भाषा प्रणाली के लिए जानी जाती है। पोलिश अपने जीभ मोड़ने वाले शब्दों के लिए प्रसिद्ध है। उर्दू अपनी फारसी अरबी लिपि और काव्य परंपरा के लिए प्रसिद्ध है।",
      charlie: "गहरी सांस लें... और धीरे से छोड़ें... याद रखें --- अपनी सांस पर ध्यान दें। शाम की कोमल, परिवेशी आवाज़ों को सुनें जो आपको घेरती हैं, शांति और स्थिरता लाती हैं।"
    },
    ta: {
      jessica: "எல்டோரியாவின் பழங்கால நிலத்தில், வானம் மாயாஜால வண்ணங்களால் ஒளிர்ந்து, காடுகள் பழைய ரகசியங்களைக் கிசுகிசுத்த இடத்தில், செஃபிரோஸ் என்ற ஒரு டிராகன் வாழ்ந்தது. கதைகளில் சொல்லப்படும் பயங்கரமான டிராகன்களைப் போலல்லாமல், செஃபிரோஸ் ஞானமுள்ளதும் கருணையுள்ளதுமாக இருந்தது. அவரைப் பற்றித் தெரிந்தவர்கள் அவரை மதித்து வந்தனம் செய்தனர்.",
      brian: "அரோமாப்ரூ வெறும் காபி தயாரிப்பதில்லை --- அது தருணங்களை உருவாக்குகிறது. முதல் நறுமணத்திலிருந்து கடைசிக் குடிவரை, நாளை எதிர்கொள்ள எனக்குத் தேவையான ஊக்கம் அது.",
      alice: "போஸ்ட்பைலட் ஆதரவைத் தொடர்பு கொண்டதற்கு நன்றி. உங்கள் குரல் தொகுப்பு திட்டத்தில் சிக்கல் ஏற்பட்டுள்ளது என்பதை நான் புரிந்துகொள்கிறேன். கவலைப்பட வேண்டாம் --- நாங்கள் உதவ இங்கே இருக்கிறோம். தயவுசெய்து உங்கள் கணக்கு மின்னஞ்சலைப் பகிர்ந்து, நீங்கள் எதிர்கொள்ளும் குறிப்பிட்ட சிக்கலை விளக்க முடியுமா? இது சிக்கலை விரைவாகத் தீர்க்க எங்களுக்கு உதவும்.",
      bill: "ஆங்கிலத்தில் மிக அதிக சொற்கள் உள்ளன, ஆக்ஸ்போர்ட் ஆங்கில அகராதியில் 170,000 க்கும் மேல். பிரெஞ்சு அதன் இனிமையான ஒலி மற்றும் காதல் வெளிப்பாடுகளுக்கு பிரபலம். ஜெர்மன் அதன் கூட்டுச் சொற்களுக்கு பிரபலம். ஜப்பானிய அதன் சிக்கலான எழுத்து முறை மற்றும் தனித்துவமான மரியாதை மொழி அமைப்புக்கு அறியப்படுகிறது. போலிஷ் அதன் நாக்கு சுழற்றும் சொற்களுக்கு பிரபலம். உருது அதன் பாரசீக அரபி எழுத்து மற்றும் கவிதை பாரம்பரியத்திற்கு பிரபலம்.",
      charlie: "ஆழமாக மூச்சு இழுங்கள்... மெதுவாக வெளியிடுங்கள்... நினைவில் கொள்ளுங்கள் --- உங்கள் மூச்சில் கவனம் செலுத்துங்கள். மாலையின் மென்மையான, சுற்றுப்புற ஒலிகளைக் கேளுங்கள், அவை உங்களைச் சுற்றி, அமைதியும் நிம்மதியும் கொண்டு வருகின்றன."
    }
  };

  const getVoiceForLanguage = (langCode: string) => {
    const voices = speechSynthesis.getVoices();
    switch (langCode) {
      case 'hi':
        return voices.find(voice => voice.lang.startsWith('hi-IN') || voice.lang.startsWith('hi')) || voices[0];
      case 'ta':
        return voices.find(voice => voice.lang.startsWith('ta-IN') || voice.lang.startsWith('ta')) || voices[0];
      default:
        return voices.find(voice => voice.lang.startsWith('en-US') || voice.lang.startsWith('en')) || voices[0];
    }
  };

  const getTextToSpeak = (character: Character, language: string): string => {
    if (language === 'en') {
      return character.text;
    }
    return translations[language]?.[character.id] || character.text;
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    const textToShow = getTextToSpeak(character, selectedLanguage);
    setTranslatedText(textToShow);
    
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    if (selectedCharacter) {
      const textToShow = getTextToSpeak(selectedCharacter, newLanguage);
      setTranslatedText(textToShow);
    }
    
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    if (!selectedCharacter) return;

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = getTextToSpeak(selectedCharacter, selectedLanguage);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voice = getVoiceForLanguage(selectedLanguage);
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    
    // Adjust speech parameters based on language
    switch (selectedLanguage) {
      case 'hi':
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        break;
      case 'ta':
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        break;
      default:
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
    }
    
    utterance.volume = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechSynthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const handleDownload = () => {
    if (!selectedCharacter) return;
    
    const textToDownload = translatedText || selectedCharacter.text;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedCharacter.name}_${selectedLanguage}_script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const displayText = translatedText || (selectedCharacter ? getTextToSpeak(selectedCharacter, selectedLanguage) : '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-3">Voice Agent Interface</h1>
          <p className="text-lg opacity-90">Select a character and hear their voice in your preferred language</p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Text Display */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8 min-h-32 border-l-4 border-blue-400 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-50"></div>
            <div className="relative z-10">
              {selectedCharacter ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{selectedCharacter.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedCharacter.name}</h3>
                      <p className="text-sm text-gray-600">{selectedCharacter.role}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {languages.find(l => l.code === selectedLanguage)?.name}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700" dir={selectedLanguage === 'ta' || selectedLanguage === 'hi' ? 'ltr' : 'ltr'}>
                    {displayText}
                  </p>
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-gray-500 italic">
                  Select a character below to see their text and hear their voice
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
            {/* Language Selector */}
            <div className="flex items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium bg-white cursor-pointer transition-all hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePlay}
                disabled={!selectedCharacter}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  isPlaying
                    ? 'bg-gradient-to-r from-yellow-400 to-pink-400 text-white shadow-lg'
                    : 'bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              
              <button
                onClick={handleDownload}
                disabled={!selectedCharacter}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-600 text-white font-semibold transition-all transform hover:scale-105 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Download size={18} />
              </button>
            </div>
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className={`bg-white border-2 rounded-2xl p-5 cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                  selectedCharacter?.id === character.id
                    ? 'border-current shadow-lg scale-105'
                    : 'border-gray-200 hover:border-current'
                }`}
                style={{
                  '--tw-border-opacity': selectedCharacter?.id === character.id ? '1' : '0.3',
                  borderColor: character.color,
                  color: character.color
                } as React.CSSProperties}
              >
                <div 
                  className="absolute inset-0 opacity-5 transition-opacity"
                  style={{ backgroundColor: character.color }}
                ></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2"
                      style={{ 
                        borderColor: character.color,
                        backgroundColor: `${character.color}15`
                      }}
                    >
                      {character.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{character.name}</h3>
                      <p className="text-xs text-gray-600">{character.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-3">
                    {selectedLanguage === 'en' 
                      ? character.text.substring(0, 100) 
                      : (translations[selectedLanguage]?.[character.id] || character.text).substring(0, 100)
                    }...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentInterface;