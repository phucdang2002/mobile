import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import { Button, Card, Text } from "react-native-paper";
import { dataURL } from "../component/APIPort";

let data = []
const noS = [
    { label: "5", value: 5},
    { label: "6", value: 6},
    { label: "7", value: 7},
    { label: "8", value: 8},
    { label: "9", value: 9},
    { label: "10", value: 10},
]
const genAI = new GoogleGenerativeAI("AIzaSyBDjVXQL5XbtXmThfbptEpqmMyKyIanxdw")
const Topic = ({navigation}) => {
    const [value, setValue] = useState(null);
    const [number, setNumber] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isNumFocus, setIsNumFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])
    
    useEffect(()=> {
        axios.get(dataURL + "topics")
        .then(response=> {
            for (const item of response.data) {
                data.push({label: item.name, value: item.name.toLowerCase()})
            }
        })
    },[])
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    async function generate() {
        setList([])
        setIsLoading(true)
        const prompt = "Give me a list of "+number+" example sentences about "+value+" in JSON format form [{id, content}] (don't contain ```json and ```)"
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        try {
            setList(JSON.parse(text));
            setIsLoading(false)
        } catch (e) {
          generate();
        }
    }
    function handleGenerate() {
        if (value!== null && number!== null) {
            generate();
        } else {
            Alert.alert("You must choose a topic and number of sentences to start")
        }
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
            <Card style={{padding: 12}}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.itemTextStyle}
                    placeholder={!isFocus ? 'Select a topic' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={noS}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={styles.itemTextStyle}
                    placeholder={!isNumFocus ? 'How many sentences?' : '...'}
                    value={number}
                    onFocus={() => setIsNumFocus(true)}
                    onBlur={() => setIsNumFocus(false)}
                    onChange={item => {
                        setNumber(item.value);
                        setIsNumFocus(false);
                    }}
                />
                <Button mode="elevated" textColor="#000" style={styles.button} onPress={handleGenerate}>Generate</Button>
            </Card>
        </View>
        {isLoading&&<ActivityIndicator style={styles.loading} size={100} color="#000"/>}
        {list && list.length > 0 && (
            <View style={{flex: 2}}>
                <Text variant="headlineMedium" style={{marginBottom: 8}}>You will practice with below sentences</Text>
                <FlatList
                    data={list}
                    renderItem={({item})=>
                        <Text style={styles.content}>- {item.content}</Text>
                    }
                />
                <Button mode="contained" buttonColor="#4484E9" onPress={()=>navigation.navigate('StudyAI', {sentences: list})}>Start</Button>
            </View>
        )}
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16
    },
    button: {
        marginTop: 16
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#000"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#000"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemTextStyle: {
        fontSize: 16,
        color: "#000"
    },
    content: {
        fontSize: 16,
        padding: 4
    },
    loading: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default Topic