import axios from "axios";
import Voice from '@react-native-voice/voice';
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getHighlightedText, listen } from "../functions/CheckAnswer";
import { Icon } from "react-native-paper";
import { styles } from "../styles/StudyStyle";
const Test = ({navigation, route}) => {
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0)
    const [isListening, setIsListening] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false)
    const [error, setError] = useState();
    const [script, setScript] = useState('');
    const {type, testId} = route.params;
    const [words, setWords] = useState([]);
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = stopListening;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        axios.get("http://34.136.63.21/api/contest/"+testId)
        .then((response) => {
        setWords(response.data);
        })
        .catch((e) => console.error(e));
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
    useEffect(()=> {
        const countCorrectAnswer = () => {
            if (script!=="") {
                const {countWord} = getHighlightedText(script, words[index].content);
                const percent = (countWord*100)/words[index].content.length;
                if (percent>=80) {
                    setCount((prev)=>prev + 1);
                }
            }
        }
        countCorrectAnswer()
    }, [script])
    const hideTabBar = () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {display: "none"} });
    };
    const showTabBar = () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {display: "flex"} });
    };
    useFocusEffect(
        useCallback(()=> {
            hideTabBar();
        },[navigation])
    )
    const onSpeechStart = () => setIsListening(true);
    const onSpeechError = (e) => setError(e);
    const onSpeechResults = async (res) => {
        const speechResult = res.value[0];
        setScript(speechResult)
    };
    const startListening = async () => {
        setIsListening(true)
        try {
            await Voice.start('en-US')
        } catch (e) {
            setError(e)
        }
    }
    const stopListening = async () => {
        try {
            await Voice.stop()
            Voice.removeAllListeners()
            setIsListening(false)
        } catch (e) {
            setError(e)
        }
    }
    const [index, setIndex] = useState(0);
    const handleNext = () => {
        const {highlighted} = getHighlightedText(script, words[index].content);
        setResult((prev)=>[...prev, highlighted]);
        setScript("")
        setIsDisabled(false)
        if (index + 1 < words.length) {
          setIndex(index + 1);
        }
        else {
            navigation.navigate("ResultTest",
            {correct: count, noOfWords: words.length, results: [...result, highlighted], type: type})
        }
    };
    const handleSkip = () => {
        setIsDisabled(true)
    }
    const handleExit = () => {
        Alert.alert("Exit Test", "Are you sure you want to exit this test? All progress will not be saved.",[
            {text: 'OK',
              onPress: () => {
                showTabBar()
                navigation.goBack();
              },
            },
            {text: 'Cancel'},
          ],
          { cancelable: false })
    }
    return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.exit} onPress={()=>handleExit()}>
            <Icon source="close" size={40} color="#000"/>
        </TouchableOpacity>
        {words[index]&&
        (script===""?
            <Text style={isDisabled?styles.skip:styles.text}>{words[index].content}</Text>:
            <Text style={styles.result}>{getHighlightedText(script, words[index].content).highlighted}</Text>)
        }
        <TouchableOpacity style={styles.listen} disabled={isDisabled} onPress={()=>listen(words[index].content)}>
            <Icon source="volume-high" size={30} color="#000"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} disabled={isDisabled} onPress={()=>(isListening ? stopListening(): startListening())}>
            <Icon source="microphone" size={100} color={isListening?"#fc0808":"#000"}/>
        </TouchableOpacity>
        <View style={styles.btnSkip}>
            <Button title="Skip" onPress={handleSkip}/>
        </View>
        <View style={styles.btnNext}>
            <Button title="Next" onPress={handleNext}/>
        </View>
    </View>
    )
}
export default Test;