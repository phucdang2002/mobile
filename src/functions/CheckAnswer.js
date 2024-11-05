import { Text } from "react-native";
import Tts from "react-native-tts";

Tts.setDefaultVoice("en-us-x-iol-local")
Tts.setDefaultRate(0.5);
const listen = (sentence) => {
    Tts.speak(sentence)
}

const getHighlightedText = (transcript, content) => {
    let highlighted = [];
    let countWord = 0;
    const speech = transcript.toLowerCase();
    const word = content.toLowerCase().replace(/[,.!?]/g, '').replace(/[-]/g, ' ');
    let j = 0;
    for (let i = 0; i < word.length; i++) {
        if (j >= content.length) break;
        if (speech[i] !== word[i]) {
            while (j < content.length && content[j].match(/[,.!?-]/g)) {
                highlighted.push(content[j]);
                j++;
                countWord++
            }
            if (j < content.length) {
                highlighted.push(<Text key={i} style={{ color: 'red' }}>{content[j]}</Text>);
            }
        } else {
            while (j < content.length && content[j].match(/[,.!?-]/g)) {
                highlighted.push(content[j])
                j++;
                countWord++
            }
            if (j < content.length) {
                highlighted.push(content[j]);
                countWord++
            }
        }
        j++;
    }
    while (j < content.length) {
        highlighted.push(content[j]);
        j++;
    }
    return { highlighted, countWord };
  };

export { getHighlightedText, listen }